import { BrowserRouter as Router, Route } from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import SinglePost from './pages/SinglePost'

import MenuBar from './components/MenuBar'

import { AuthProvider } from './contexts/auth'
import AuthRoutes from './routes/AuthRoutes'

function App() {

  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path='/' component={Home} />
          <AuthRoutes exact path='/login' component={Login} />
          <AuthRoutes exact path='/register' component={Register} />
          <Route exact path='/post/:postId' component={SinglePost} />
        </Container>
      </Router>
    </AuthProvider>

  )
}

export default App
