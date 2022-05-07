import { UserModel } from './../../shared/models/UserModel';
import { UserService } from './../../shared/Services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userlist: UserModel[] = [];
  user : UserModel ;
  constructor(private userService: UserService) {
    this.user = new UserModel(); }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.getAllUser();
  }

  oChangeUserStatus(item: UserModel) {
    console.log(item.id)
    this.userService.oChangeUserStatus(item.id).subscribe((data) => {
      this.getAllUser();
    });
  }
  getAllUser() {
    this.userService.getAllUsers().subscribe((res : UserModel[]) => {
      console.log(res)
      this.userlist = res;
    });
  }

}
