import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();
  alive = this.heroe.alive;
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private heroeService: HeroesService) {
    this.createForm();
    // this.loadForm();
  }

  private createForm() {
    this.form = this.fb.group({
      id    : [ this.heroe.id ],
      name  : [ this.heroe.name, [ Validators.required] ],
      power : [ this.heroe.power ]
    });
  }

  loadForm() {
    this.form.reset({
      id: this.heroe.id,
      name: this.heroe.name,
      power: this.heroe.power
    });
  }

  send() {

    if ( this.form.invalid ) {
      console.log('Formulario no válido');
      return;
    }

    Swal.fire({
      title: 'Espere...',
      text: 'Guardando Información',
      allowOutsideClick: false
    });

    Swal.showLoading();

    this.heroe = {
      ...this.form.value,
      alive: this.alive
    };

    let petition: Observable<any>;

    if ( this.form.value.id ) {
      petition = this.heroeService.updateHeroe$( this.heroe );
    } else {
      petition = this.heroeService.createHeroe$( this.heroe );
    }

    petition.subscribe((resp) => {
      this.form.get('id').setValue( this.heroe.id );
      Swal.fire({
        title: this.heroe.name,
        text: 'Se Actualizó correctamente'
      });
    });
  }

  ngOnInit(): void {}

}
