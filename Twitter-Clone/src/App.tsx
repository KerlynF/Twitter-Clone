import './App.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import Users from './components/Users'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
})

function App() {

  return (
    <ApolloProvider client={client}>
      <Users/>
    </ApolloProvider>
  )
}

export default App
