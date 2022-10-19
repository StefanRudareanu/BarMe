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
            const obj={drinkname:drinkname}
            return await fetch(`http://localhost:4000/api/users/${username}`,{
                method:'PATCH',
                headers:{
                    "Content-type":"application/json",
                    'auth-token':token},
                body:JSON.stringify(obj)
            })
        },
        async AddRating(username:string,rating:number,token:string){
            return await fetch(' ',{
                method:'PATCH',
                headers:{
                    "Content-type":"application/json",
                    'auth-token':token}});},
        async GetBarmanDataBarman(barmanusername:string,location:string,token:string){
            return await fetch(`http://localhost:4000/api/users/allbarmans/${barmanusername}/${location}`,{
                method:"GET",
                headers:{
                    "Content-type":"application/json",
                    "auth-token":token}
            })
        },
        async GetBarmanDataUser(location:string,token:string){
            return await fetch(`http://localhost:4000/api/users/allbarmansusers/${location}/`,{
                method:"GET",
                headers:{
                    "Content-type":"application/json",
                    "auth-token":token}
            })
        },
        CheckToken(token:string):number{
        let status:number;
         fetch('http://localhost:4000/api/users/avaible',{
                method:"GET",
                headers:{
                    "Content-type":"application/json",
                    "auth-token":token
                }
            }).then((res)=>{
                status=res.status;
            });
            return status;}
        
                
    }
}
export default UserData;