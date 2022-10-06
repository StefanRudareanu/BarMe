 const  UserData=()=>{
    return{
         
        async GetUserData(username:string,token:string){
          return await  fetch(`http://localhost:4000/api/users/${username}`,{
                method:'GET',
                headers:{
                    "Content-type":"application/json",
                    'auth-token':token
                }
            })
        },
        async AddDrinks(username:string,token:string,drinkname:string){
            return await fetch(`http://localhost:4000/api/users/${username}`,{
                method:'POST',
                headers:{
                    "Content-type":"application/json",
                    'auth-token':token},
                body:JSON.stringify({drinkname:drinkname})
            })
        }
    }
}
export default UserData;