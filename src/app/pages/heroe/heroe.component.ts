import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HeroeModel } from '../../models/heroe.model';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
    this.loadForm();
  }

  private createForm() {
    this.form = this.fb.group({
      id    : [ { value: '', disabled: true } ],
      name  : [ '', [ Validators.required] ],
      power : [ '' ]
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

    let heroeRequest: HeroeModel;
    heroeRequest = {
      ...this.form.value,
      ...this.heroe
    };
    console.log(heroeRequest);
  }

  ngOnInit(): void {}

}
