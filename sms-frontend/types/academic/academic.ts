export interface ClassesModel {
    id?: number,
    class_name: string

}

export interface FacultyModel {
    id?: number,
    faculty_name: string
}



export interface SubjectModel {
    id?: number,
    subject_code: string,
    subject_name: string,
    status: boolean,
}

export interface CoursesModel {
    id?: number,
    course_code: string,
    course_name: string,
    faculty_id: number,
    academic_type_id: number,
    status: boolean,
    subjects?: BigInteger[],
    course_duration: number
}


export interface AcademicSessionDropdown {
    key: number, 
    value: string
}


export interface ChargesModel {
    id?: number, 
    charge_code : string, 
    charge_name: string, 
    charge_amount: number, 
    is_active?: boolean, 
    class_id: number, 
    course_id?: number, 
    academic_session_type?: number
}