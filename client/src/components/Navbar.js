import React, {useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {UserContext} from '../App';

const Navbar = () => {
  const {state, dispatch} = useContext(UserContext);
  const history = useHistory();
  const renderList = () => {
    if(state){
      return [
        <li className="navbar-items" key="1"><Link to="/profile">Profile</Link></li>,
        <li key="2"><Link to="/create">Create</Link></li>,
        <li key="3">
          <button className="logout btn waves-effect waves-light #f50057 pink accent-3" onClick={()=>{
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
        <li key="4"><Link to="/login">Login</Link></li>,
        <li key="5"><Link to="/signup">Signup</Link></li>
      ]
    }
  }

    return(
      <div className="navbar-fixed" >
        <nav>
            <div className="nav-wrapper white">
              <Link to={state ? "/": "/login"} className="brand-logo left">Picstagram</Link>
              <ul id="nav-mobile" className="right">
                {renderList()}
              </ul>
            </div>
        </nav>
      </div>
    )
}

export default Navbar; 