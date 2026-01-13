import type { LoginModal } from "../Modal/LoginModal";
import api from "./api";

export const login =(data: LoginModal) =>{
    return api.post("/Authentication/login",data)
}

export const logout = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    return api.post("/Authentication/logout", refreshToken);    
}