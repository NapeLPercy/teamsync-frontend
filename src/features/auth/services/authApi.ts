import apiClient from "../../../services/api/client";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterCompanyData {
  email: string;
  companyName: string;
  fullName: string;
  password: string;
}

export interface LoginResponse {
  user: {
    userId: string;
    role: string;
    email: string;
  };
  message: string;
  success: boolean;
}

export interface RegisterCompanyResponse {
  companyId: string;
  success: boolean;
  message: string;
}

//login
export function login(data: LoginData) {
  return apiClient<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

//create account
export function registerCompany(data: RegisterCompanyData) {
  return apiClient<RegisterCompanyResponse>("/api/auth/company", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
