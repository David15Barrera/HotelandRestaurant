//Cliente
export interface CustomerSignUpModel {
  fullName: string;
  cui: string;
  phone?: string;
  email: string;
  address: string;
  password: string;   
  roleId: number;     
}

//Empleado
export interface EmployeeSignUpModel {
  fullName: string;
  cui: string;
  phone?: string;
  email: string;
  jobPosition?: string;
  salary: number;
  address: string;
  password: string;
  roleId: number;
  hotelId?: string;
  restaurantId?: string;
}

//Inicio session
export interface SignInModel {
  email: string;
  password: string;
}

//Inicio sesión con MFA
export interface SignInMFAModel {
  email: string;
  code: number;
}

//Recuperar contraseña
export interface RecoverPasswordModel {
  email: string;
}
