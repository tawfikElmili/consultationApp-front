import { Component, OnInit } from "@angular/core";
import { ConsultationModel } from "src/app/shared/models/ConsultationModel";
import { ConsultationService } from "src/app/shared/Services/consultation.service";

@Component({
  selector: "app-consultation-list",
  templateUrl: "./consultation-list.component.html",
  styleUrls: ["./consultation-list.component.scss"],
})
export class ConsultationListComponent implements OnInit {
  consultationList: ConsultationModel[] = [];
  constructor(private consultationService: ConsultationService) {}

  ngOnInit() {
    this.getAll()
  }

  getAll() {
    this.consultationService.getAll().subscribe((data) => {
      this.consultationList = data;
      console.log(data)
    });
  }
}
