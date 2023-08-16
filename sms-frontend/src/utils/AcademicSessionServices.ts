"use client"
import { AcademicSessionDropdown } from "@/academic/academic";
import APIHandlers from "./APIHandlers";



const getAcademicSession = async (course_duration: number, academic_type: number) => {
    try {
        const data = await APIHandlers.get(`/api/academic/academic-type/`, { id: academic_type })
        let total_session = data.occurance_per_year * course_duration
        let session_name: string;
        switch (data.academic_type) {
            case 'Yearly':
                session_name = 'Year'
                break;

            default:
                session_name = data.academic_type
                break;
        }
        let return_object : AcademicSessionDropdown[] =  [];

        for (let index = 0; index < total_session; index++) {
            return_object.push({
                key: index + 1, 
                value: `${index + 1 } ${session_name}`
            })
        }

        return  return_object;



    } catch (error) {
        console.log(error);


    }



}


export default getAcademicSession