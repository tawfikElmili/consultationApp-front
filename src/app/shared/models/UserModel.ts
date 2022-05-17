export class UserModel {
    id : number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    numTel: number;
    gender: string;
    role: string;
    status: boolean
    constructor(){
      this.gender = "MALE";
      this.role ="DOCTOR";
    }
}
export class loginModel {
    email: string;
    password: string;
}
