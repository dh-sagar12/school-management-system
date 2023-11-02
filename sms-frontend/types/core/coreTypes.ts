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

export interface MenusModel {
        id?: number,
        menu_code: string,
        menu_name: string,
        menu_type: string,
        parent_id: number | null,
        created_on?: string
}




export interface AttachmentModel {
        id?: number,
        table_name: string,
        table_id: number,
        attachment_type: string,
        original_file_name: string,
        file_name: string,
        is_active: boolean,
        created_on?: string
}