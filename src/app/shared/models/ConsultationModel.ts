import { MedicationModel } from "./Medication";

export class ConsultationModel {
    id :number;
    userId: string;
    userAffectId: string;
    medicationList: MedicationModel[]=[]
    observation: string;
    title:string;
    description: string;

}
