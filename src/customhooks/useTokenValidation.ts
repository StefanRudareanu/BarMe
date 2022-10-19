import UserData from "../endpoints/HandleUserData";

const useTokenValidation=()=>{
    return{
        Validate(token:string):number{
            let res=UserData().CheckToken(token);
            if(res==400){
                return 400;
            }
            else return 200;}}}
export default useTokenValidation;