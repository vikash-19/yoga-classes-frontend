import  {useMutation} from 'react-query'
import axios from 'axios'
export default function useRegister(){
    async function queryAPI(body){
        let data = await axios.post("/register",body,{ withCredentials: true })
        return data
    }
    
    const {mutate:register , isError, isLoading,isSuccess} = useMutation(queryAPI);
    
    return {
        register,
        isError,
        isLoading,
        isSuccess
    }
}
