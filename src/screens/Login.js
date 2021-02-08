import { Form, Formik } from 'formik'
import { useHistory } from "react-router-dom"
import { useState } from 'react'
import FormField from '../components/FormField'
import { loginDefaultValues, loginValidationSchema } from '../validation/formikConfig'
import { fb } from '../firebase'

const Login = () => {

    const [serverError, setServerError] = useState("")
    const history = useHistory()
    const login = ({ email,password }, { setSubmitting }) => {
        console.log(email, password)
        fb.auth.signInWithEmailAndPassword(email, password)
            .then((res) => {
                if(!res.user) {
                    setServerError(`We're having trouble logging you in. Please try again.`)
                }
            }).catch((err) => {
                console.log(err)
                if(err.code === "auth/wrong-password") setServerError("Invalid Credentials")
                else if(err.code === "auth/user-not-found") setServerError("No account for this email")
                else setServerError("Something went wrong...")
            }).finally(() => setSubmitting(false))
    }

    return (
        <div className="auth-form">
            <h1>Login</h1>
            <Formik
                onSubmit={login}
                validateOnMount={true}
                initialValues={loginDefaultValues}
                validationSchema={loginValidationSchema}
            >
                {({ isValid, isSubmitting }) => (
                    <Form>
                        <FormField name="email" label="Email Address" type="email" />
                        <FormField name="password" label="Password" type="password" />

                        <div className="auth-link-container">
                            Don't have an account yet? <span className="auth-link" onClick={() => history.push(`signup`)}> Signup!</span>
                        </div>

                        <button disabled={isSubmitting || !isValid} type="submit">Login</button>
                    </Form>
                )}
            </Formik>
            {!!serverError && <div className="error">{serverError}</div>}
        </div>
    )
}

export default Login
