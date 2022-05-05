import { MedicationModel } from "./Medication";

export class ConsultationModel {
    _id :any;
    userId: string;
    userAffectId: string;
    medicationList: MedicationModel[]=[]
    observation: string;
    title:string;
    description: string;

}
