export class MedicationModel {
    id: number;
    designation: string;
    note: string;
    modifier:boolean;
    constructor(){
      this.modifier = true ;
    }
}
