// import useSWR from 'swr'
// import APIHandlers from './APIHandlers'

// // const fetcher = (...args: any ) => fetch(args[0]).then(res => res.json())




// const fetcher = (...args: any ) => APIHandlers.get(args[0]).then(res => res.json())




// const  CheckAuthentication =   ()=> {
//     const { data, error, isLoading } = useSWR(`/api/auth/user`, fetcher)
//     console.log('data', data );
    
//     return {
//       profile: data,
//       isLoading,
//       isError: error
//     }
//   }
  

// // 