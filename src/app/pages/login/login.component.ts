import { NgForm } from '@angular/forms';
import { UserService } from './../../shared/Services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { loginModel } from 'src/app/shared/models/UserModel';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: loginModel
  worngPassOrEmail: boolean = false;
  submitted = true;
  constructor(private userService: UserService, private router: Router) {
    this.login = new loginModel();
    localStorage.clear();
  }

  onLogin(form: NgForm) {
    if (form.valid) {
      this.userService.login(this.login).subscribe(data => {
        console.log(data)
        const resSTR = JSON.stringify(data);
        const resJSON = JSON.parse(resSTR);
        if (resJSON.status === 'err') {
          this.worngPassOrEmail = false;
        } else {
          this.worngPassOrEmail = false;
          localStorage.setItem('currentUser', JSON.stringify(resJSON.UserData[0]));
          localStorage.setItem('token', resJSON.token.toString());
          this.router.navigate(['/dashboard']);
        }
      });
    }
  }
  ngOnInit() {
  }

}
