import * as Yup from "yup"

export const signupDefaultValues = {
    email: "",
    password: "",
    confirmPassword: "",
    displayName: ""
}

export const signupValidationSchema = Yup.object().shape({
    email: Yup.string().email(`Invalid email adress.`).required(`Required`),
    displayName: Yup.string().required(`Required`).min(3, `Must be atleast 3 characters`).max(20, `Cannot exceed 20 characters`),
    password: Yup.string().required(`Required`).min(9, `Must be atleast 8 characters`),
    confirmPassword: Yup.string().required(`Required`).oneOf([Yup.ref(`password`), null], `Passwords must match`)
})

export const loginDefaultValues = {
    email: "",
    password: ""
}

export const loginValidationSchema = Yup.object().shape({
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
})