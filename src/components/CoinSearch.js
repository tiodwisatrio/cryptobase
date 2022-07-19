import React, { useState } from 'react'
import CoinItem from './CoinItem';

const CoinSearch = ({coins}) => {
    const [searchText, setSearchText] = useState('');

  return (
    <div className='rounded-div my-5 text-xs md:text-base'>
        <div className='flex flex-col md:flex-row justify-between pt-4 pb-6 text-center md:text-right'>
            <h1 className='text-xl font-bold my-2'>Search Crypto</h1>
            <form action="">
                <input onChange={(e) => setSearchText(e.target.value)} className='w-full bg-primary  px-4 py-2 rounded-2xl shadow-xl placeholder:text-sm' type="text" placeholder='Search a coin'/>
            </form>
        </div>

        <table className='w-full border-collapse text-center'>
            <thead>
                <tr className='border-b'>
                    <th>#</th>
                    <th className='px-4'>Rank</th>
                    <th className='text-left'>Coin</th>
                    <th>Code</th>
                    <th>Price</th>
                    <th>24h</th>
                    <th className='hidden md:table-cell'>24h Volume</th>
                    <th className='hidden md:table-cell'>Mkt</th>
                    <th>Last 7 Days</th> 
                </tr>
            </thead>
            <tbody>
                {coins.filter((value) => {
                    if(searchText === '') {
                        return value
                    } else if (value.name.toLowerCase().includes(searchText.toLowerCase())) {
                        return value
                    }
                }).map((coin) => {
                   return <CoinItem key={coin.id} coin={coin} />
                })}
            </tbody>
        </table>
    </div>
  )
}

export default CoinSearch