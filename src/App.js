import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import {Routes, Route} from "react-router-dom";
import Home from "./routes/Home";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import Account from "./routes/Account";
import axios from "axios";
import CoinPage from './routes/CoinPage';
import Footer from "./components/Footer";
import {AuthContextProvider} from "./context/AuthContext";

function App() {
  const [coins, setCoins] = useState([]);
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true`;
  
  useEffect(()=> {
    axios.get(url).then((response) => {
      setCoins(response.data);
    })
  }, [url])

  return <ThemeProvider>
    <AuthContextProvider>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home coins={coins} />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/account" element={<Account />} />
      <Route path="/coin/:coinId" element={<CoinPage coins={coins} />}>
        <Route path=":coinId" />
      </Route>
    </Routes>
    <Footer />
    </AuthContextProvider>
  </ThemeProvider>
}

export default App;
