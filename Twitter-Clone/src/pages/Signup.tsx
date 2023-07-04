import {gql, useMutation} from "@apollo/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import {useNavigate} from 'react-router-dom'
import { Link } from "react-router-dom";
import twitterLogo from '../styles/assets/Twitter-logo-vector-01.svg'

const SIGNUP_MUTATION = gql`
mutation signup($name: String, $email: String!, $password: String!){
    signup(name: $name, email: $email, password: $password){
        token
    }
}
`

const Signup = () => {
    const history = useNavigate()
    const [signup, {data}] = useMutation(SIGNUP_MUTATION)
    const initialValues = {
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    }
    const validationSchema = Yup.object({
      email: Yup.string().email("Invalid email address").required("Email required"),
      password: Yup.string().max(20, "Must be 20 characters or less").required("Password required"),
      confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Passwords must match"),
      name: Yup.string().max(15, "Must be 15 characters or less").required("Name required")
    })
    return (
        <div>
           <img 
              src={twitterLogo} 
              alt="logo" 
              className="logo" 
              style={{width: '50px'}}
            />
            <h3>Sign up</h3>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async(value, {setSubmitting}) => {
                setSubmitting(true)
                const response = await signup({
                  variables: value
                })
                console.log(response)
                localStorage.setItem("token", response.data.signup.token)
                setSubmitting(false)
                history('/users')
              }}    
            >
              <Form>
                <Field name="email" type="text" placeholder="Email"/>
                <ErrorMessage name="email" component={'div'}/>
                <Field name="name" type="text" placeholder="Name"/>
                <ErrorMessage name="name" component={'div'}/>
                <Field name="password" type="password" placeholder="Password"/>
                <ErrorMessage name="password" component={'div'}/>
                <Field name="confirmPassword" type="password" placeholder="Confirm Password"/>
                <ErrorMessage name="confirmPassword" component={'div'}/>
                <button className="login-button" type="submit">Sign up</button>
              </Form>
            </Formik>
            <div className="register">
              <h4>Already have an account?</h4>
              <Link to="/login"><span>Log In</span></Link>
            </div>
        </div>
    )
}

export default Signup;