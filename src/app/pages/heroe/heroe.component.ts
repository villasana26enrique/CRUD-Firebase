import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';

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

    this.heroe = {
      ...this.form.value,
      alive: this.alive
    };

    if ( this.form.value.id ) {
      this.heroeService.updateHeroe$( this.heroe ).subscribe( data => console.log );
    } else {
      this.heroeService.createHeroe$( this.heroe ).subscribe( data => this.form.get('id').setValue( this.heroe.id ) );
    }
  }

  ngOnInit(): void {}

}
