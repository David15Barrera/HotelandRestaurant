import { Injectable } from '@angular/core';
import { environments } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {

    API_BASE = environments.API_URL

    //Session module
    API_AUTH = `${this.API_BASE}/auth`

}
