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
import Swal from "sweetalert2";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
  user: UserModel;

  constructor(
    private userService: UserService,
    private medicationService: MedicationService,
    private consultationService: ConsultationService,
    private route: ActivatedRoute
  ) {
    this.consultation = new ConsultationModel();
    this.medication = new MedicationModel();

    this.user = new UserModel();
    this.user = JSON.parse(localStorage.getItem("currentUser"));
  }

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.consultationId = +param.id;
      this.getConsultationById(this.consultationId);
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
  // get conultation by id
  getConsultationById(id: number) {
    this.consultationService
      .getConsultationById(id)
      .subscribe((data: ConsultationModel) => {
        this.consultation = data;
        this.getMedicationsByConsultation(this.consultation.id);
      });
  }
  // get conultation by id
  async getMedicationsByConsultation(id: number) {
    this.medicationService
      .getMedicationsByConsultation(id)
      .subscribe((data) => {
        this.consultation.medicationList = data;
        console.log("medacation",data)
      });
  }

  onEdit() {
    this.modifier = true;
    this.consultationModifier = new ConsultationModel();
    this.consultationModifier.id = this.consultation.id;
    this.consultationModifier.description = this.consultation.description;
    this.consultationModifier.observation = this.consultation.observation;
    this.consultationModifier.title = this.consultation.title;
    this.consultationModifier.userAffectId = this.consultation.userAffectId;
    this.consultationModifier.medicationList = this.consultation.medicationList;
  }
  onCancel() {
    this.consultation.id = this.consultationModifier.id;
    this.consultation.description = this.consultationModifier.description;
    this.consultation.observation = this.consultationModifier.observation;
    this.consultation.title = this.consultationModifier.title;
    this.consultation.userAffectId = this.consultationModifier.userAffectId;
    this.consultation.medicationList = this.consultationModifier.medicationList;
    this.consultationModifier = new ConsultationModel();
    this.modifier = false;
  }
  onUpdate(form: NgForm) {
    if (form.valid) {
      this.consultationService.update(this.consultation).subscribe(() => {
        Swal.fire("Success!", " consultation has been updated.", "success");
      });

      this.modifier = false;
    }
  }

  // medications methods
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

  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }
}
