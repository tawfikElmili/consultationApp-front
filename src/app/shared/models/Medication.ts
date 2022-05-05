export class MedicationModel {
    id: string;
    designation: string;
    note: string;
    modifier:boolean;
    constructor(){
      this.modifier = true ;
    }
}
