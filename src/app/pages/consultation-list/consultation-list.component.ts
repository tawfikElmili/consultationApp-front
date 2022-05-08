import { Component, OnInit } from "@angular/core";
import { ConsultationModel } from "src/app/shared/models/ConsultationModel";
import { UserModel } from "src/app/shared/models/UserModel";
import { ConsultationService } from "src/app/shared/Services/consultation.service";
import { UserService } from "src/app/shared/Services/user.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-consultation-list",
  templateUrl: "./consultation-list.component.html",
  styleUrls: ["./consultation-list.component.scss"],
})
export class ConsultationListComponent implements OnInit {
  consultationList: ConsultationModel[] = [];
  userList: UserModel[] = [];
  user: UserModel;
  hideDelete: boolean;
  constructor(
    private consultationService: ConsultationService,
    private userService: UserService
  ) {
    this.user = new UserModel();

    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.getAll();
    this.userService.getAllUsers().subscribe((res: UserModel[]) => {
      this.userList = res;
    });
    this.user = JSON.parse(localStorage.getItem('currentUser'))
    if(this.user.role == "DOCTOR"){
      this.hideDelete = false ;
    }else{
      this.hideDelete = true ;
    }
  }

  getAll() {
    console.log(this.user)
    this.consultationService.getAll(this.user).subscribe((data) => {
      this.consultationList = data;
      console.log(data);
    });
  }
  onDelete(item: ConsultationModel) {
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
        this.consultationService.onDelete(item.id).subscribe(() => {});
        Swal.fire("Success!", "Consultation has been deleted.", "success");
        const index = this.consultationList.indexOf(item, 1);
        if (index > -1) {
          this.consultationList.splice(index, 0);
          this.getAll();
        }
      }
    });
  }
}
