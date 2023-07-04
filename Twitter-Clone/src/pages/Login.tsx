import {gql, useMutation} from "@apollo/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import {Link, useNavigate} from 'react-router-dom'
import twitterLogo from '../styles/assets/Twitter-logo-vector-01.svg'

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
            <img 
              src={twitterLogo} 
              alt="logo" 
              className="logo" 
              style={{width: '50px'}}
            />
            <h1>Log In to our fake twitter page :D</h1>
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
                <button className="login-button" type="submit"><span>Login</span></button>
              </Form>
            </Formik>
            <div className="register">
              <h4>Don't have an account?</h4>
              <Link to="/signup"><span>Sign Up</span></Link>
            </div>
        </div>
    )
}

export default Login;