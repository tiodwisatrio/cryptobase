import React, { useState } from 'react'
import {AiOutlineStar, AiFillStar} from 'react-icons/ai'
import { Sparklines, SparklinesLine } from 'react-sparklines';
import {Link} from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';
import {db} from '../firebase'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import swal from 'sweetalert';

const CoinItem = ({coin}) => {

    const [savedCoin, setSavedCoin] = useState(false);
    const {user} = UserAuth();

    const coinPath = doc(db, "users", `${user?.email}`);
    const saveCoin = async() => {

        if(user?.email) {
            setSavedCoin(true)
            
            await updateDoc(coinPath, {
                watchList: arrayUnion({
                    id : coin.id,
                    name : coin.name,
                    image: coin.image,
                    rank: coin.market_cap_rank,
                    symbol: coin.symbol,
                })
            })
        } else {
            swal("Info", "Kamu harus login untuk bisa menyimpan coin.");
        }
    }


    return (
        <tr className='h-[80px] border-b overflow-hidden'>
        <td className='cursor-pointer' onClick={saveCoin}>
            {savedCoin ? <AiFillStar /> : <AiOutlineStar  />}
        </td>
        <td>{coin.market_cap_rank}</td>
        <td>
            <Link to={`/coin/${coin.id}`}>
                <div className='flex items-center'>
                    <img className='w-4 md:w-6 mr-2 rounded-full' src={coin.image} alt={coin.id} />
                    <p>{coin.name}</p>
                </div>
            </Link>
        </td>
        <td>{coin.symbol.toUpperCase()}</td>
        <td>{coin.current_price}</td>
        <td>
        {coin.price_change_percentage_24h > 0 ? (<p className='text-teal-500'>{coin.price_change_percentage_24h.toFixed(2)}%</p>) : (<p className='text-red-500'>{coin.price_change_percentage_24h.toFixed(2)}%</p>)}
        </td>
        <td className='w-[180px] hidden md:table-cell'>${coin.total_volume.toLocaleString()}</td>
        <td className='w-[180px] hidden md:table-cell'>${coin.market_cap.toLocaleString()}</td>
        <td>
            <Sparklines data={coin.sparkline_in_7d.price}>
                <SparklinesLine color={coin.price_change_percentage_24h > 0 ? '#14b8a6' : '#ef4444'} />
            </Sparklines>
        </td>
    </tr>
    )
}

export default CoinItem