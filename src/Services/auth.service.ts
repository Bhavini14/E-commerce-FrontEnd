import type { LoginModal } from "../Modal/LoginModal";
import api from "./api";

export const login =(data: LoginModal) =>{
    debugger
    return api.post("/Authentication/login",data)
}