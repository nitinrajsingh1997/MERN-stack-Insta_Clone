import React, {useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {UserContext} from '../App';

const Navbar = () => {
  const {state, dispatch} = useContext(UserContext);
  const history = useHistory();
  const renderList = () => {
    if(state){
      return [
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/create">Create</Link></li>,
        <li>
          <button class="btn waves-effect waves-light #f50057 pink accent-3" onClick={()=>{
            localStorage.clear()
            dispatch({type:"CLEAR"})
            history.push('/login')
          }}>
            Logout
          </button>
        </li>
      ]
    }
    else{
      return [
        <li><Link to="/login">Login</Link></li>,
        <li><Link to="/signup">Signup</Link></li>
      ]
    }
  }
    return(
      <div className="navbar-fixed" >
        <nav>
            <div className="nav-wrapper white">
              <Link to={state ? "/": "/login"} className="brand-logo left">Picstagram</Link>
              <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i class="material-icons">menu</i></a>
              <ul className="right hide-on-med-and-down">

              </ul>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                {renderList()}
              </ul>
            </div>
        </nav>
      </div>
    )
}

export default Navbar; 