import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfigService } from '../../../services/api-config.service';
import { EmployeeSignUpModel, CustomerSignUpModel } from '../models/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient, private apiConfig: ApiConfigService) { }
//Arreglar este solo lo copie 

 signUp(signUpModel: CustomerSignUpModel): Observable<any> {
    return this.http.post<any>(`${this.apiConfig.API_AUTH}/sign-up`, signUpModel)
  }
  /*
  signin(signInModel: SignInModel): Observable<any> {
    return this.http.post<any>(`${this.apiConfig.API_AUTH}/sign-in`, signInModel)
  }
*/

}

