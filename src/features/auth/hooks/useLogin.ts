import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../services/authApi";
import { useAuth } from "./useAuth";

export function useLogin() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      setUser(data.user);
      navigate("/dashboard");
    },
  });
}
