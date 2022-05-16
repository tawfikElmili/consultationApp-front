import { NgForm } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { UserModel } from "src/app/shared/models/UserModel";
import { UserService } from "src/app/shared/Services/user.service";
import { MedicationModel } from "src/app/shared/models/Medication";
import { MedicationService } from "src/app/shared/Services/medication.service";
import { ConsultationModel } from "src/app/shared/models/ConsultationModel";
import { ConsultationService } from "src/app/shared/Services/consultation.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-consultation-add",
  templateUrl: "./consultation-add.component.html",
  styleUrls: ["./consultation-add.component.scss"],
})
export class ConsultationAddComponent implements OnInit {
  userList: UserModel[] = [];
  medicationListModifier: MedicationModel[] = [];
  medication: MedicationModel;
  consultation: ConsultationModel;

  constructor(
    private userService: UserService,
    private medicationService: MedicationService,
    private consultationService: ConsultationService,
    private router: Router
  ) {
    this.consultation = new ConsultationModel();
    this.medication = new MedicationModel();
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe((res: UserModel[]) => {
      this.userList = res.filter(u=>
        u.role !== "DOCTOR"
      );
    });

    if (this.consultation.medicationList.length == 0) {
      const medication = new MedicationModel();
      this.consultation.medicationList.push(medication);
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.consultationService.save(this.consultation).subscribe((data) => {
        Swal.fire("Success!", " consultation has been saved.", "success");
        this.router.navigate(["/consultation-edit/" + data.id]);
      });
    }
  }
  onCancel(form: NgForm) {
    form.reset();
  }

  onEditMed(item: MedicationModel) {
    item.modifier = true;
    this.medicationListModifier = [];
    this.medicationListModifier = this.consultation.medicationList;
  }
  onDeleteMed(item: MedicationModel) {
    const index = this.consultation.medicationList.indexOf(item, 1);
    if (index == -1) {
      this.medicationService.onDelete(item.id).subscribe(

      );
      this.consultation.medicationList.splice(index, 0);
    }
    this.medication.modifier = false;
  }
  onSaveMed(item: MedicationModel) {
    const index = this.consultation.medicationList.indexOf(item);
    if (index == -1) {
      this.consultation.medicationList[index] = this.medication;
    }
    item.modifier = false;
  }
  onAddMed() {
    const medication = new MedicationModel();
    this.consultation.medicationList.push(medication);
  }
}
