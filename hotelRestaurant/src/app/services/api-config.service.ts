import { Injectable } from '@angular/core';
import { environments, environmetsHotel } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {

  API_BASE = environments.API_URL;
  API_HOTELBASE = environmetsHotel.API_URL;

  // AUTH
  API_AUTH = `${this.API_BASE}/v1/auth`;
  API_EMPLOYEE = `${this.API_BASE}/v1/employee`;
  API_CUSTOMER = `${this.API_BASE}/api/v1/customers`;

  //Hotel:
  API_HOTEL = `${this.API_HOTELBASE}/api/v1/hotels`;
  API_ROOMS = `${this.API_HOTELBASE}/api/v1/rooms`;
  API_RESERVAS = `${this.API_HOTELBASE}/api/v1/reservations`;
}
