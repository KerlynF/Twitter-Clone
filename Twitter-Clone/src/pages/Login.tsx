import {gql, useMutation} from "@apollo/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import {useNavigate} from 'react-router-dom'


const LOGIN_MUTATION = gql`
mutation login($email: String!, $password: String!){
    login(email: $email, password: $password){
        token
    }
}
`

const Login = () => {
    const history = useNavigate()
    const [login, {data}] = useMutation(LOGIN_MUTATION)
    const initialValues = {
      email: '',
      password: ''
    }
    const validationSchema = Yup.object({
      email: Yup.string().email("Invalid email address").required("Email required"),
      password: Yup.string().max(20, "Must be 20 characters or less").required("Password required"),
    })
    return (
        <div>
            <h1>Login</h1>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async(value, {setSubmitting}) => {
                setSubmitting(true)
                const response = await login({
                  variables: value
                })
                localStorage.setItem("token", response.data.login.token)
                setSubmitting(false)
                history('/users')
              }}    
            >
              <Form>
                <Field name="email" type="text" placeholder="Email"/>
                <ErrorMessage name="email" component={'div'}/>
                <Field name="password" type="password" placeholder="Password"/>
                <ErrorMessage name="password" component={'div'}/>
                <button type="submit">Login</button>
              </Form>
            </Formik>
        </div>
    )
}

export default Login;