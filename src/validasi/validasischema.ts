import * as Yup from 'yup';

export const validasischema = Yup.object({
    email:Yup.string().min(6,"minimal 6 karakter").email("email not valid").required("email is required"),
    password:Yup.string().min(6,"minimal 6 karakter").matches(/^[A-Za-z0-9]*$/, 'Password cannot contain special characters'), // No special characters,
    confirmpassword:Yup.string().oneOf([Yup.ref('password'),''], 'Passwords not match'),
  })
