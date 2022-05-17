import { UserModel } from './../../shared/models/UserModel';
import { UserService } from './../../shared/Services/user.service';
import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
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

  onChangeUserStatus(item: UserModel) {

    Swal.fire({
      title: "Are you sure?",
      text: '',
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, updated it!",
    }).then((result) => {
      if (result.value) {
        this.userService.oChangeUserStatus(item).subscribe((data) => {
          this.getAllUser();
        });
        Swal.fire("Success!", "User has been updated.", "success");

      }
    });
  }
  getAllUser() {
    this.userService.getAllUsers().subscribe((res : UserModel[]) => {
      this.userlist = res;
    });
  }
  onDelete(item: UserModel) {
    Swal.fire({
      title: "Are you sure?",
      text: 'You won"t be able to revert this!',
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        this.userService.onDelete(item.id).subscribe(() => {});
        Swal.fire("Success!", "User has been deleted.", "success");
        const index = this.userlist.indexOf(item, 1);
        if (index > -1) {
          this.userlist.splice(index, 0);
          this.getAllUser();
        }
      }
    });
  }

}
