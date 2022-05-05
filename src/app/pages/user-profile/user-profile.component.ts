import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UserModel } from "src/app/shared/models/UserModel";
import { UserService } from "src/app/shared/Services/user.service";

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
  getUserbyId() {
    this.userService.UpdateUser(this.user).subscribe(() => {});
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
      this.userService.UpdateUser(this.user).subscribe(() => {
        this.modifier = true;
      });
    }
  }
}
