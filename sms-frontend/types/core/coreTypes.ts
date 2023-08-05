export interface BranchesDropdownType {
        id: number,
        org_code: string,
        nick_name: string
}



export interface BranchView {
        id: number,
        org_code: string,
        org_name: string,
        nick_name: string,
        registration_date: Date,
        registration_number: string,
        pan_number: string,
        country: string,
        province: string,
        district: string,
        street: string,
        contact_number: string,
        web_address: string,
        fax: string,
        is_primary_office: boolean,
        creator: number
}



export interface StateModel {
        id: number,
        province_name: string,
        province_name_np: string
}


export interface DistrictModel {
        id: number
        district_name: string
        district_name_np: string
        province_id: number
}


export interface LocalBodiesModel {
        id: number, 
        district_id: number, 
        local_body_name: string, 
        local_body_name_np: string, 
        local_body_type: string, 
}