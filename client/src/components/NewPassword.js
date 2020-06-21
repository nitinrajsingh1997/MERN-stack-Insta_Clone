import React, {useState, useContext} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import {UserContext} from '../App';
import M from 'materialize-css';

const NewPassword = () => {
    const history = useHistory();
    const [password, setPassword] = useState("");
    const {token} = useParams();
    console.log(token)

    const SendUserData = () => {
        fetch("/signin", {
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                password
            })
            
        }).then(res=>res.json())
        .then(data => {
            console.log(data)
            if(data.error){
                M.toast({html: data.error, classes: "#f44336 red"});
            }
            else{
                M.toast({html: data.message, classes: "#4caf50 green"});
                history.push('/login')
            }
        }).catch(err=>{
            console.log(err);
        })
    }
    return (
        <div className="login-card">
            <div className="card auth-card input-field">
                <h2>Picstagram</h2>
                <input type="password" placeholder="enter new password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <button class="btn waves-effect waves-light #f50057 pink accent-3" onClick={()=>SendUserData()}>Update Password
                </button>
            </div>
        </div>
    )
}

export default NewPassword;