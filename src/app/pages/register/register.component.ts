import { UserService } from './../../shared/Services/user.service';
import { UserModel } from './../../shared/models/UserModel';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';





@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public register: UserModel;

  submitted = false;


  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) {
    this.register = new UserModel();
  }

  ngOnInit() {

  }

  onSubmit(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.userService.register(this.register).subscribe(data => {
        const resSTR = JSON.stringify(data);
        const resJSON = JSON.parse(resSTR);
        if (resJSON.status === 'ok') {
          form.reset();
          this.router.navigate(['/login']);
        }

      }, error => {
      });
    }
  }




}
