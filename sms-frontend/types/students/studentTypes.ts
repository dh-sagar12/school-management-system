export interface StudentInfo {
    id?: number,
    student_id?: number,
    first_name: string,
    middle_name: string | null,
    last_name: string,
    date_of_birth: Date | string | null,
    gender: 'Male' | 'Female' | 'Other' | 'RatherNotSay',
    father_name: string | null,
    mother_name: string | null,
    grand_father_name: string | null,
    email: string | null,
    introduced_on: Date | string
}


export interface StudentContactInfo {
    id?: number,
    student_id?: number,
    relation_type: 'Self' | 'Father' | 'Mother' | 'Other'
    contact_type: 'Mobile' | 'Landline' | 'Other',
    contact_number: string | null
}

export interface StudentAddress {
    key?: number,
    id?: number,
    address_type: 'Permanent' | 'Temporary' | 'Other',
    state_id: number,
    state?: string,
    district_id: number,
    district?: string,
    local_bodies_id: number,
    local_body?: string,
    ward_no: number | null,
    street: string,
    tole_name: string
}


export interface StudentClass {
    id?: number,
    academic_year_id: number,
    academic_year?: string,
    admission_date: Date | string,
    class_id: number,
    class?: string,
    faculty_id: number,
    faculty?: string,
    course_id: number,
    course?: string,
    has_passed: boolean

}


export interface AddNewStudentForm {
    student: StudentInfo,
    student_contact: StudentContactInfo[],
    student_addresses: StudentAddress[]
}


export interface AdmissionGridView {
    id?: number,
    tran_id : number
    admission_date_ad: Date | string,
    admission_date: string,
    student_id: number,
    student_name: string,
    contact_number: string,
    class_name: string,
    faculty_name: string,
    course_name: string,
}


export interface StudentClassModel {
    id?: number;
    student_id: number;
    academic_year_id: number;
    admission_date: string;
    class_id: number;
    course_id?: number;
    academic_session_type?: number;
    has_passed?: string;
    passed_year?: string;
    passed_grade?: number;
    created_by?: number;
    tran_id?: number;
    created_on?: string;
}