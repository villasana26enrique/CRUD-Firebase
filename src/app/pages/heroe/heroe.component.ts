import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  private createForm() {
    this.form = this.fb.group({
      firebase_id : [ { value: '', disabled: true } ],
      name  : [ '', [ Validators.required] ],
      power : [ '' ],
    });
  }

  save() {
    console.log(this.form);
  }

  ngOnInit(): void {}

}
