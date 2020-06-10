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

  createHeroe$( heroe: HeroeModel ) {
    return this.http.post(`${ this.url }/heroes.json`, heroe).pipe(
      map((resp: any) => {
        heroe.id = resp.name;
        return heroe;
      })
    );
  }

  updateHeroe$( heroe: HeroeModel ) {
    /* Creo un objeto nuevo igual que el heroe que recibo,
    ya que se va a modificar. Se Eliminara el ID para que
    no se cree una propiedad nueva en FB. Y si lo elimino
    en el objeto que recibo, se va a perder la referencia 
    en el objeto original*/
    const heroeRequest = {
      ...heroe
    };
    /* Eliminamos */
    delete heroeRequest.id;
    return this.http.put(`${ this.url }/heroes/${ heroe.id }.json`, heroeRequest);
  }

  getHeroeById$( id: string ) {
    return this.http.get(`${ this.url }/heroes/${ id }.json`);
  }

  getHeroes$() {
    return this.http.get(`${ this.url }/heroes.json`).pipe( map( this.createHeroesArray ));
  }

  private createHeroesArray(heroesObj: object) {
    const heroes: HeroeModel[] = [];

    if (heroesObj === null) { return []; }

    Object.keys( heroesObj ).forEach( key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      heroes.push(heroe);
    });
    return heroes;
  }

}
