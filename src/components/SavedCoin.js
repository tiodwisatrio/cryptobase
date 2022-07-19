import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AiOutlineClose} from 'react-icons/ai';
import {doc, onSnapshot, updateDoc} from 'firebase/firestore'
import {db} from '../firebase';
import { UserAuth } from '../context/AuthContext';
import swal from 'sweetalert';


const SavedCoin = () => {
    const [coins, setCoins] = useState([])
    const {user} = UserAuth();

    useEffect(() => {
        onSnapshot(doc(db, "users", `${user.email}`), (doc) => {
            setCoins(doc.data()?.watchList)

        })
    }, [user.email])

    const coinPath = doc(db, "users", `${user.email}`);
    const removeCoin = async(passedId) => {
        try {
            swal({
                title: "Ingin menghapus coin?",
                text: "Coin yang telah dihapus tidak dapat dikembalikan",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    const result = coins.filter((item) => item.id !== passedId)
                     updateDoc(coinPath, {
                        watchList: result
                    })
                  swal("Berhasil menghapus coin", {
                    icon: "success",
                  });
                } else {
                  swal("Batal menghapus coin");
                }
              });
           

        } catch (error) {
            console.log(error.message)
        }
    }

  return (
    <div>
        {coins?.length === 0  ? 
            (<div className='text-center mt-4'>
                <p>No Coin Saved.</p> <Link className='font-bold text-accent' to='/'>Click Here</Link> to save your coins.
            </div>) : (
            <table className='w-full border-collapse text-center'>
                <thead>
                    <tr className='border-b'>
                        <th className='px-4'>Rank</th>
                        <th className='text-left'>Coin</th>
                        <th className='text-left'>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {coins?.map(coin => (
                        <tr key={coin.id} className='h-[60px] overflow-hidden'>
                            <td>{coin?.rank}</td>
                            <td>
                                <Link to={`coin/${coin.id}`}>
                                    <div className='flex items-center'>
                                        <img src={coin?.image} className='w-8 mr-4' alt='/' />
                                        <div>
                                            <p className='hidden sm:table-cell'>{coin.name}</p>
                                            <p className='text-gray-500 text-left text-sm'>{coin.symbol.toUpperCase()}</p>
                                        </div>
                                    </div>
                                </Link>
                            </td>
                            <td className='pl-8' >
                                <AiOutlineClose onClick={() => removeCoin(coin.id)} className='-translate-x-5 cursor-pointer bg-rose-500 hover:bg-rose-700 transition-all duration-300 text-white w-7 h-7 p-1 font-bold rounded' />
                               
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        )}
    </div>
  )
}

export default SavedCoin
