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
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe((res : UserModel[]) => {
      console.log(res)
      this.userlist = res;
    });
  }

  oChangeUserStatus(item: UserModel) {
    this.userService.oChangeUserStatus(item._id).subscribe((data) => {
    });
  }

}
