import { Component, Input, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MedicationModel } from "src/app/shared/models/Medication";

@Component({
  selector: "app-medication-add-modal",
  templateUrl: "./medication-add-modal.component.html",
  styleUrls: ["./medication-add-modal.component.scss"],
})
export class MedicationAddModalComponent implements OnInit {
  @Input() medication: MedicationModel;

  constructor(public activeModal: NgbActiveModal, modal: NgbModal) {
    this.medication = new MedicationModel();
  }

  ngOnInit() {}
  onSave(form: NgForm) {
    if (form.valid) {
      this.activeModal.close(this.medication);
    }
  }
}
