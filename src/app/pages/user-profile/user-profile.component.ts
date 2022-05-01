import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/shared/models/UserModel';
import { UserService } from 'src/app/shared/Services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

    user : UserModel ;
    constructor(private userService: UserService) {
    this.user = new UserModel();
    this.user = JSON.parse(localStorage.getItem('currentUser'));

   }
  ngOnInit() {
  }
  getUserbyId(){
    this.userService.UpdateUser(this.user).subscribe(()=>{
    });
  }

}
