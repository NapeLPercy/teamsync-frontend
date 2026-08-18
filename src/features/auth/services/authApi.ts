import apiClient from "../../../services/api/client";

/*LOGIN*/
export interface LoginData {
  email: string;
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

export function login(data: LoginData) {
  return apiClient<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/*REGISTER COMPANY*/
export interface RegisterCompanyData {
  email: string;
  companyName: string;
  fullName: string;
  password: string;
}

export interface RegisterCompanyResponse {
  companyId: string;
  success: boolean;
  message: string;
}

export function registerCompany(data: RegisterCompanyData) {
  return apiClient<RegisterCompanyResponse>("/api/auth/company", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/*ADD EMPLOYEE*/

export interface AddEmployeeData {
  fullName: string;
  email: string;
  role: string;
}

export interface AddEmployeeResponse {
  userId: string;
  message: string;
  success: boolean;
}

export function addEmployee(data: AddEmployeeData) {
  return apiClient<AddEmployeeResponse>("/api/auth/employee", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
