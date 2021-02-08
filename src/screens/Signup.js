import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import FormField from "../components/FormField"
import { Form, Formik } from "formik"
import { signupDefaultValues, signupValidationSchema } from "../validation/formikConfig"
import { fb } from '../firebase'

const Signup = () => {
    const history = useHistory()
    const [serverError, setServerError] = useState("")

    const signup = ({ email, displayName, password }, { setSubmitting }) => {
        fb.auth.createUserWithEmailAndPassword(email, password)
            .then((res) => {
                if(res?.user?.uid) {
                    fetch("./api/createUser", {
                        method: "POST",
                        headers: {
                            "Content-Type": "Application/json"
                        },
                        body: JSON.stringify({
                            displayName,
                            userId: res.user.uid
                        })
                    }).then(() => {
                        fb.firestore.collection(`chatUsers`).doc(res.user.uid).set({ displayName, avatar: "" })
                    }).catch((err) => {
                        console.log(err)
                    })
                } else {
                    setServerError(`We're having trouble sining you up, please try again later.`)
                }
            }).catch(err => {
                if(err.code === "auth/email-already-in-use") setServerError(`An account with this email already exists.`)
                else setServerError(`We're having trouble sining you up, please try again later.`)
            }).finally(() => setSubmitting(false))
    }


    return (
        <div className="auth-form">
            <h1>Signup</h1>
            <Formik
                onSubmit={signup}
                validateOnMount={true}
                initialValues={signupDefaultValues}
                validationSchema={signupValidationSchema}
            >
                {({ isValid, isSubmitting }) => (
                    <Form>
                        <FormField name="displayName" label="Display Name" /> 
                        <FormField name="email" label="Email Address" type="email" />
                        <FormField name="password" label="Password" type="password" />
                        <FormField name="confirmPassword" label="Confirm Password" type="password" />

                        <div className="auth-link-container">
                            Already have an account? <span className="auth-link" onClick={() => history.push(`login`)}> Log In!</span>
                        </div>

                        <button disabled={isSubmitting || !isValid} type="submit">Signup</button>
                    </Form>
                )}
            </Formik>
            {!!serverError && <div className="error">{serverError}</div>}
        </div>
    )
}

export default Signup
