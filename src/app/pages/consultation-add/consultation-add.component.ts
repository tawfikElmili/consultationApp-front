import { NgForm } from "@angular/forms";
import { MedicationAddModalComponent } from "./../medication-add-modal/medication-add-modal.component";
import { Component, OnInit } from "@angular/core";
import { UserModel } from "src/app/shared/models/UserModel";
import { UserService } from "src/app/shared/Services/user.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { MedicationModel } from "src/app/shared/models/Medication";
import { MedicationService } from "src/app/shared/Services/medication.service";
import { ConsultationModel } from "src/app/shared/models/ConsultationModel";
import { ConsultationService } from "src/app/shared/Services/consultation.service";

@Component({
  selector: "app-consultation-add",
  templateUrl: "./consultation-add.component.html",
  styleUrls: ["./consultation-add.component.scss"],
})
export class ConsultationAddComponent implements OnInit {
  userList: UserModel[] = [];
  medicationList: MedicationModel[] = [];
  consultation: ConsultationModel;

  constructor(
    private userService: UserService,
    private medicationService: MedicationService,
    private consultationService: ConsultationService,
    private modalService: NgbModal
  ) {
    this.consultation = new ConsultationModel();
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe((res: UserModel[]) => {
      console.log(res);
      this.userList = res;
    });
  }

  openModal() {
    const modalRef = this.modalService.open(MedicationAddModalComponent, { size: "lg",
    backdrop: "static"});
    modalRef.componentInstance.medication = new MedicationModel();
    // modalRef.componentInstance.result.then(
    //   (medicationData: MedicationModel) => {
    //     this.medicationService
    //       .save(medicationData)
    //       .subscribe((data: MedicationModel) => {
    //         this.consultation.medicationId.push(data.id);
    //       });
    //   }
    // );
  }
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.consultationService.save(this.consultation).subscribe(() => {});
    }
  }
  onCancel(form: NgForm) {
    form.reset();
  }
}
