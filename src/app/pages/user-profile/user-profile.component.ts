import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { subscribeOn } from "rxjs";
import { UserModel } from "src/app/shared/models/UserModel";
import { UserService } from "src/app/shared/Services/user.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  user: UserModel;
  userModifier: UserModel;
  modifier: boolean;
  constructor(private userService: UserService) {
    this.user = new UserModel();
    this.userModifier = new UserModel();
    this.user = JSON.parse(localStorage.getItem("currentUser"));

  }

  ngOnInit() {}
  getUserById() {
    this.userService.getUserById(this.user).subscribe((data: UserModel) => {
       localStorage.setItem('currentUser', JSON.stringify(data));
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    });
  }
  onCancel() {
    this.modifier = false;
    this.user = this.userModifier;
    this.userModifier = new UserModel();
  }
  onEdit() {
    this.modifier = true;
    this.userModifier = this.user;
  }
  onUpdate(form: NgForm) {
    if (form.valid) {
      this.userService.UpdateUser(this.user).subscribe((data) => {
        const resSTR = JSON.stringify(data);
        const resJSON = JSON.parse(resSTR);
        if (resJSON.status === "err") {
          Swal.fire("error!", "Please check again", "error");
        } else {
          Swal.fire("Success!", "Profile Updated with success.", "success");
          this.modifier = false;
          this.getUserById();
        }
      });
    }
  }
}
