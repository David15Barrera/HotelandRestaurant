import { Injectable } from '@angular/core';
import { environments } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {

  API_BASE = environments.API_URL;

  // AUTH
  API_AUTH = `${this.API_BASE}/v1/auth`;
  API_EMPLOYEE = `${this.API_BASE}/v1/employee`;

}
