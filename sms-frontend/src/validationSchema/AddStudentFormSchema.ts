import * as Yup from 'yup'


export const AddStudentFormValidationSchema: any =  Yup.object({
    first_name: Yup.string().required("Required"), 
    middle_name: Yup.string(), 
    last_name: Yup.string().required("Required"), 
    date_of_birth: Yup.string().required("Required"), 
    gender: Yup.string().required("Required"), 
    father_name: Yup.string().required("Required"), 
    grand_father_name: Yup.string().required("Required"), 
    email: Yup.string().email(), 
    introduced_on : Yup.string().required('Required')

})


export const StudentAddressFormvalidationSchema : any =  Yup.object({
             address_type: Yup.string().required('Required'),
             state_id:  Yup.number().required('Required').min(1, 'Required'),
             district_id:  Yup.number().required('Required').min(1, 'Required'),
             local_bodies_id: Yup.number().required('Required').min(1, 'Required'),
             ward_no: Yup.number().required('Required').min(1, 'Required'),
             street: Yup.string().required('Required'),
             tole_name: Yup.string().required('Required'),
})


// {
//     "student": {
//      "first_name": "Sagar",
//      "middle_name": "Prasad",
//      "last_name": "Dhakal",
//      "date_of_birth": "2002-03-22",
//      "gender": "Male",
//      "father_name": "Chakrapani Dhakal",
//      "mother_name": "Laxmi Sharma Dhakal",
//      "grand_father_name": "Dhana Pati Dhakal",
//      "email": "dhakalsagar2000@gmail.com", 
//      "introduced_on": "2023-07-29"
//      },
 
//      "student_contact": [
//      {
//      "relation_type": "Father",
//      "contact_type": "Mobile",
//      "contact_number": "1234567890"
//      }, 
//       {
//      "relation_type": "Mother",
//      "contact_type": "Mobile",
//      "contact_number": "0987654321"
//      }
//    ],
//    "student_addresses": [
//      { 
//          "address_type": "Permanent",
//          "state_id": 1,
//          "district_id": 1,
//          "local_bodies_id": 1,
//          "ward_no": 5,
//          "street": "Sample Street",
//          "tole_name": "Sample Tole"
//      }, 
//       { 
//          "address_type": "Temporary",
//          "state_id": 5,
//          "district_id": 4,
//          "local_bodies_id": 3,
//          "ward_no": 5,
//          "street": "T Sample Street",
//          "tole_name": "T Sample Tole"
//      }
//    ],
//    "student_class": {
//      "academic_year_id": 1,
//      "admission_date": "2023-04-20",
//      "class_id": 16,
//      "faculty_id": 1,
//      "course_id": 8,
//      "has_passed": false
//    }
//  }
 