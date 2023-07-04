import './App.css'
import './styles/login.css'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client'
import Users from './components/Users'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { setContext } from 'apollo-link-context'
import Signup from './pages/Signup'
import Login from './pages/Login'

const httpLink = new HttpLink({uri: 'http://localhost:4000'})
const authLink = setContext(async(req, {headers}) => {
  const token = localStorage.getItem('token')

  return {
    ...headers,
    headers: {
      Authorization: token ? `Bearer ${token}` : null
    }
  }
})

const link = authLink.concat(httpLink as any)

const client = new ApolloClient({
  link: (link as any),
  cache: new InMemoryCache()
})

const router = createBrowserRouter([
  {
    path: '/users',
    element: <Users/>
  },
  {
    path: '/signup',
    element: <Signup/>,
    children: []
  }, 
  {
    path: '/login',
    element: <Login/>
  }
])

function App() {

  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router}/>
    </ApolloProvider>
  )
}

export default App
