import { useQuery } from "react-query";
import axios from "axios";

const checkUserInLocalStorage = () => {
  //console.log("____token", localStorage.getItem("gdt_token"))
  let user = JSON.parse(localStorage.getItem("prode_user"))
  return user
};

export default function useAuth() {
  let user = checkUserInLocalStorage()

  //console.log("use_auth",status, data, error, isFetching)
  if(!user){
    return {user: null, isLogged: false};
  }
  return {user, isLogged: true};
}
