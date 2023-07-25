import * as Yup from 'yup'


export const LoginFormValidationSchema: any =  Yup.object({
     email: Yup.string().email().required("Please Enter Your Email"), 
     password: Yup.string().required("Please Enter Your Password"), 
     branch_id : Yup.number().required().positive().integer()
})