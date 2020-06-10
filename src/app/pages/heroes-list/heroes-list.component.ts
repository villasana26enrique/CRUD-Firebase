import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css']
})
export class HeroesListComponent implements OnInit {

  heroes: HeroeModel[] = [];

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.heroesService.getHeroes$().subscribe( resp => this.heroes = resp );
  }

  deleteHeroe(heroe: HeroeModel, index: number) {
    Swal.fire({
      title: 'Esta Seguro',
      text: `Desea eliminar a: ${ heroe.name }`,
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      // Si la respuesta es True, procede a Eliminar el heroe
      if ( resp.value ) {
        // Actualizo el listado de heroes, utilizando el Splice para eliminar una posición del Array
        this.heroes.splice(index, 1);
        this.heroesService.deleteHeroe$( heroe.id ).subscribe();
        Swal.fire({
          title: heroe.name,
          text: 'Se ha eliminado con Exito'
        });
      }
    });
  }

}
