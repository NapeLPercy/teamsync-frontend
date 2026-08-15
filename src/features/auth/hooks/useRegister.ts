import { useNavigate } from "react-router-dom";
import { registerCompany } from "../services/authApi";
import { useMutation } from "@tanstack/react-query";

export function useRegister(){
    const navigate =useNavigate();
    return useMutation({
        mutationFn:registerCompany,
        onSuccess:()=>{
            navigate("/sign-in");
        }
    });
}