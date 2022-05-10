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
    console.log(this.user)
    this.userService.getUserById(this.user).subscribe((data: UserModel) => {
      //  localStorage.setItem('currentUser', JSON.stringify(data));
      // this.user = JSON.parse(localStorage.getItem('currentUser'));
    });
  }
  onCancel() {
    this.modifier = false;
    this.user.id = this.userModifier.id;
    this.user.email = this.userModifier.email;
    this.user.firstName = this.userModifier.firstName;
    this.user.lastName = this.userModifier.lastName;
    this.user.numTel = this.userModifier.numTel;
  }
  onEdit() {
    this.modifier = true;
    this.userModifier = new UserModel();
    this.userModifier.id = this.user.id;
    this.userModifier.email = this.user.email;
    this.userModifier.firstName = this.user.firstName;
    this.userModifier.lastName = this.user.lastName;
    this.userModifier.numTel = this.user.numTel;
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
