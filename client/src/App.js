import React, {useEffect, createContext, useReducer, useContext} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Signup from './components/Signup';
import CreatePost from './components/CreatePost';
import UserProfile from './components/UserProfile';
import Reset from './components/Reset';
import {reducer, intialState} from './reducers/userReducer';
import NewPassword from './components/NewPassword';

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const {state, dispatch} = useContext(UserContext);
  useEffect(()=> {
    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
      dispatch({type:"USER", payload:user});
    }
    else{
      if(!history.location.pathname.startsWith('/reset'))
          history.push('/login')
    }
  }, [])
  return (
    <Switch>
    <Route exact path="/"><Home /></Route>
    <Route path="/login"><Login /></Route>
    <Route path="/signup"><Signup /></Route>
    <Route exact path="/profile"><Profile /></Route>
    <Route path="/create"><CreatePost /></Route>
    <Route path="/profile/:userid"><UserProfile /></Route>
    <Route path="/reset"><Reset /></Route>
    <Route path="/new-password/:token"><NewPassword /></Route>
    </Switch>
  )
}
function App() {
  const [state, dispatch] = useReducer(reducer, intialState)
  return (
    <UserContext.Provider value={{state, dispatch}}>
    <BrowserRouter>
      <Navbar />
      <Routing />
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
