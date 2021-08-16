import './style/styles.css'
import { Home } from './screens/Home';
import { PostDetails } from './screens/PostDetails';
import { Login } from './screens/Login';
import { Register } from './screens/Register';
import {HashRouter,Switch,Route} from 'react-router-dom'
import { AuthProvider } from './context/auth';
import { Header } from './components/Header';
import { CreatePost } from './screens/CreatePost';
import { UpdatePost } from './screens/UpdatePost';

function App() {
  return (
    <>
      <AuthProvider>
        <HashRouter>
          <Header/>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/post/:id' component={PostDetails}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/create' component={CreatePost}/>
            <Route path='/update/:id' component={UpdatePost}/>
          </Switch>
        </HashRouter>
      </AuthProvider>
    </>
  )
}

export default App;
