import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import {FaTwitter, FaFacebook, FaReddit, FaGithub} from 'react-icons/fa'
import DOMPurify from 'dompurify';
import {useParams} from 'react-router-dom';

const CoinPage = () => {
  const [coin, setCoin] = useState([]);
  const params = useParams();

  const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}?localization=false&sparkline=true`;

  useEffect(() => {
    axios.get(url).then((response) => {
      setCoin(response.data);
      // console.log(response.data);
    }
  )}, [url])

  return (
    <div className='rounded-div my-12 py-8'>
      <div className='flex py-8'>
        <img className='w-20 mr-8' src={coin.image?.large} alt="coin_image" />
        <div>
          <p className='text-2xl font-bold'>{coin?.name} Price</p>
          <p>({coin.symbol?.toUpperCase()} / USD)</p>
        </div>
      </div>

      <div className='grid md:grid-cols-2 gap-16'>
        <div>
          <div className='flex justify-between'>
            {coin.market_data?.current_price ? (<p className='text-2xl font-bold'>${coin.market_data.current_price.usd.toLocaleString()}</p>) : null}
            <p>7 Day</p>
          </div>
          <div className='mt-8 mb-4'>
            <Sparklines data={coin.market_data?.sparkline_7d.price}>
                <SparklinesLine color="gray" />
            </Sparklines>
            
          </div>
          <div className='flex justify-between py-4'>
            <div>
              <p className='text-gray-500 text-sm'>Market Cap</p>
              {coin.market_data?.market_cap ? (<p>${coin.market_data?.market_cap.usd.toLocaleString()}</p>) : null}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Volume (24h)</p>
              {coin.market_data?.market_cap ? (<p>${coin.market_data?.total_volume.usd.toLocaleString()}</p>) : null}
            </div>
          </div>

          <div className='flex justify-between py-4'>
            <div>
              <p className='text-gray-500 text-sm'>24 High</p>
              {coin.market_data?.high_24h ? (<p>${coin.market_data?.high_24h.usd.toLocaleString()}</p>) : null}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>24 Low</p>
              {coin.market_data?.low_24h ? (<p>${coin.market_data?.low_24h.usd.toLocaleString()}</p>) : null}
            </div>
          </div>
        </div>

        <div>
          <p className='text-xl font-bold'>Market Stats</p>
          <div className='flex justify-between py-4'>
            <div>
              <p className='text-gray-500 text-sm'>Market Ranks</p>
              {coin.market_cap_rank}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Hashing Algrotihm</p>
              {coin.hashing_algorithm ? <p>{coin.hashing_algorithm}</p> : null}
            </div>
            <div >
              <p className='text-gray-500 text-sm'>Trust Score</p>
              {coin.tickers ? <p>{coin.liquidity_score.toFixed(2)}</p> : null}
            </div>
          </div>

          <div className='flex justify-between py-4'>
            <div>
              <p className='text-gray-500 text-sm'>Price Change (24h)</p>
              {coin.market_data ? (<p>{coin.market_data.price_change_percentage_24h.toFixed(2)}%</p>) : null}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Price Change (7d)</p>
              {coin.market_data ? (<p>{coin.market_data.price_change_percentage_7d.toFixed(2)}%</p>) : null}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Price Change (14d)</p>
              {coin.market_data ? (<p>{coin.market_data.price_change_percentage_14d.toFixed(2)}%</p>) : null}
            </div>
          </div>

          <div className='flex justify-between py-4'>
            <div>
              <p className='text-gray-500 text-sm'>Price Change (30d)</p>
              {coin.market_data ? (<p>{coin.market_data.price_change_percentage_30d.toFixed(2)}%</p>) : null}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Price Change (60d)</p>
              {coin.market_data ? (<p>{coin.market_data.price_change_percentage_60d.toFixed(2)}%</p>) : null}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Price Change (1y)</p>
              {coin.market_data ? (<p>{coin.market_data.price_change_percentage_1y.toFixed(2)}%</p>) : null}
            </div>
          </div>

          <div className='flex w-full items-center justify-around mt-8'>
            <FaTwitter />
            <FaFacebook />
            <FaReddit />
            <FaGithub />
          </div>

        </div>
      </div>

    {/* deskripsi */}
    <div className='mt-16'>
      <p className='text-3xl font-bold mb-4'>About {coin.name}</p>
      <p className='text-gray-500 leading-7' dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(coin.description ? coin.description.en : ''),}}></p>
    </div>

    </div>
  )
}

export default CoinPage