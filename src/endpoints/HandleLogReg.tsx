
const HandleLogReg=(()=>{
 return{
   async Register(data:object){
        return  await fetch('http://localhost:4000/api/users/register',{
        method:'POST',
        headers:{
           'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)})},
   async LogIn(data:object){
      return await fetch('http://localhost:4000/api/users/login',{
         method:'POST',
         headers:{
             'Content-Type': 'application/json'},
         body:JSON.stringify(data)
      })},
      async GetUserData(username:string,token:string){
         return await fetch(`httpp://localhost:4000/api/users/me/`)
      }
   }
   })
export default HandleLogReg;
 
