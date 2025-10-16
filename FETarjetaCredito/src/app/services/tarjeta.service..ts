import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  private myAppUrl = 'https://localhost:7095/'
  private myApiUrl = 'api/tarjeta/'

  constructor(private https: HttpClient){}

  getListTarjetas(): Observable<any> {
    return this.https.get(this.myAppUrl + this.myApiUrl);
  }
  deleteTarjeta(id: number): Observable<any> {
    return this.https.delete(this.myAppUrl + this.myApiUrl + id)

  }
  saveTarjeta(tarjeta: any): Observable<any>{
    return this.https.post(this.myAppUrl + this.myApiUrl, tarjeta);
  }

  updateTarjeta(id: number, tarjeta: any): Observable<any>{
    return this.https.put(this.myAppUrl + this.myApiUrl + id, tarjeta);

  }


}
