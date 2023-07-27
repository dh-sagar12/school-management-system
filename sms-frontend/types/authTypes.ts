export interface Login {
    email: string,
    password: string, 
    branch_id: number

}



export interface UserInfo {
    id: number;
    email: string;
    username : string;
    branch_id : number;
    first_name : string;
    middle_name: string;
    last_name : string;
    date_of_birth: Date;
    gender: number;
  }
  
  