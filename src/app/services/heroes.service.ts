import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://login-app-3dbde.firebaseio.com';

  constructor(private http: HttpClient) {
    console.log('Servicio Iniciado');
  }

  createHeroe$(heroe: HeroeModel) {
    return this.http.post(`${ this.url }/heroes.json`, heroe).pipe(
      map((resp: any) => {
        heroe.id = resp.name;
        return heroe;
      })
    );
  }
}
