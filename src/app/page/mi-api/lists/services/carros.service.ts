import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carro, Carros } from '../interface/carros';

@Injectable({
  providedIn: 'root'
})
export class CarrosService {
  urliC = 'http://localhost:3000/api/carro'
  constructor(private http:HttpClient) { }

  getAllcarros():Observable<Carros>{
    return this.http.get<Carros>(`${this.urliC}`)
  }

  postCarros(newCarros:Carro):Observable<Carro>{
    return this.http.post<Carro>(`${this.urliC}`, newCarros)
  }

  putCarros(id:string, newCarros:Carro): Observable<Carro>{
    return this.http.put<Carro>(`${this.urliC}/${id}`, newCarros)
  }

  deleteCarros(id:String): Observable<Carro>{
    return this.http.delete<Carro>(`${this.urliC}/${id}`)
  }
}
