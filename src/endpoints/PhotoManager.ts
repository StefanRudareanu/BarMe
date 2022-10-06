const PhotoManager=()=>{
    return{
      async  UploadProfilePhoto  (file:string,username:string,token:string){
           console.log(file);
            return await  fetch(`http://localhost:4000/api/users/photo/${username}`,{
                    method:"POST",
                    headers:{
                        "Content-type":"application/json",
                        'auth-token':token
                    },
                    body:JSON.stringify({file:file})})}}}

export default PhotoManager;