import { NgForm } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { UserModel } from "src/app/shared/models/UserModel";
import { UserService } from "src/app/shared/Services/user.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { MedicationModel } from "src/app/shared/models/Medication";
import { MedicationService } from "src/app/shared/Services/medication.service";
import { ConsultationModel } from "src/app/shared/models/ConsultationModel";
import { ConsultationService } from "src/app/shared/Services/consultation.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-consultation-edit",
  templateUrl: "./consultation-edit.component.html",
})
export class ConsultationEditComponent implements OnInit {
  userList: UserModel[] = [];
  medicationListModifier: MedicationModel[] = [];
  consultation: ConsultationModel;
  consultationModifier: ConsultationModel;
  consultationId: number;
  modifier: boolean;
  medication: MedicationModel;

  constructor(
    private userService: UserService,
    private medicationService: MedicationService,
    private consultationService: ConsultationService,
    private route: ActivatedRoute
  ) {
    this.consultation = new ConsultationModel();
    this.medication = new MedicationModel();
  }

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.consultationId = +param;
      this.getById(this.consultationId);
    });
    this.userService.getAllUsers().subscribe((res: UserModel[]) => {
      console.log(res);
      this.userList = res;
    });

    if (this.consultation.medicationList.length == 0) {
      const medication = new MedicationModel();
      this.consultation.medicationList.push(medication);
    }
  }
  getById(id: number) {
    this.consultationService
      .getById(id)
      .subscribe((data: ConsultationModel) => {
        this.consultation = data;
      });
  }
  onUpdate(form: NgForm) {
    if (form.valid) {
      console.log(this.consultation);
      this.consultationService.save(this.consultation).subscribe(() => {});
    }
  }
  onCancel() {
    this.modifier = false;
    this.consultation = this.consultationModifier ;
  }
  onEdit(){
    this.modifier = true;
  }

  onEditMed(item: MedicationModel) {
    item.modifier = true;
    this.medicationListModifier = [];
    this.medicationListModifier = this.consultation.medicationList;
  }
  onDeleteMed(item: MedicationModel) {
    const index = this.consultation.medicationList.indexOf(item, 1);
    if (index == -1) {
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
