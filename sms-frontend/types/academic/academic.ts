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
}