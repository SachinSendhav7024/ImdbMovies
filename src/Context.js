import React, { useContext, useEffect, useState } from 'react'
 export const API_URL = `http://www.omdbapi.com/?apikey=69c73bf9`

const AppContext = React.createContext();

const AppProvider = ({children})=> {
        const [isLoading, setIsLoading] = useState(true);
        const [movie,setMovie] = useState([]);
        const [isError, setIsError] = useState({show:'false', msg:""}); 
        const [query, setQuery] = useState('border')
   const getMovies =async (url)=>{
    setIsLoading(true)
      try{
        const res = await fetch(url);
        const data = await res.json();
        console.log(data)
        if(data.Response ==='True'){
          setMovie(data.Search);
          setIsLoading(false);
          setIsError({
            show:false
          })
         }else{
          setIsError({
            show:true,
            msg:data.Error,
          });
         }
      }catch (error){
        console.log(error);
      }
     }



  useEffect(()=>{ 

     let timeOut = setTimeout (() =>{
      getMovies(`${API_URL}&s=${query}`)
     },1000)
        
        return ()=> clearTimeout(timeOut)
        }, [query]);

  return <AppContext.Provider value={{isError,isLoading,movie,query,setQuery}}>{children}</AppContext.Provider>
}
         const useGlobalContext = ()=>{
                 return useContext(AppContext);
                                      }
export {AppContext,AppProvider,useGlobalContext};