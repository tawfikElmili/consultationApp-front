import { MedicationModel } from "./Medication";

export class ConsultationModel {
    id :number;
    userId: number;
    userAffectId: string;
    medicationList: MedicationModel[]=[]
    observation: string;
    title:string;
    description: string;

}
