import  {useQuery} from 'react-query'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function useHome(){
    const navigate = useNavigate()
    async function queryAPI(){
        try{
        let data = await axios.get("/details",{ withCredentials: true }).then(res=>{return res.data})
        // console.log(data) ;
        return data
        }catch(err){
            navigate('/login')
        }
    }
    
    const { data, status ,refetch:refetchData, isLoading,isSuccess} = useQuery("details",queryAPI,{retry : 0});
    return {
        data,
        refetchData,
        status,
        isLoading,
        isSuccess
    }
}
