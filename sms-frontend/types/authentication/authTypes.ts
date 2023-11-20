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
  
  

export interface BranchLoginPolicyModel {
    id?: number, 
    user_id: number, 
    branch_id: number, 
    date_access_from: Date| string, 
    date_access_to: Date | string, 
    time_access_from:  Date | string, 
    time_access_to:  Date | string, 
    created_by:  number, 
}