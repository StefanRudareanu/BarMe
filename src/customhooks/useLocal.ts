const useLocal=()=>{
    return{
       CreateStorage(data:string,key:string){
        localStorage.setItem(key,data)
       },
       GetLocalStorage(key:string){
        return localStorage.getItem(key);},
        CreateSessionStorage(data:string,key:string){
        sessionStorage.setItem(key,data)
       },
       GetLocalSessionStorage(key:string){
        return sessionStorage.getItem(key);}
    }
}
export default useLocal;