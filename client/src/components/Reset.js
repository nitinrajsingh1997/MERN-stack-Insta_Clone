import React, {useState, useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import M from 'materialize-css';

const Reset = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");

    const SendUserData = () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email", classes: "#f44336 red"})
            return;
        }
        fetch("/reset-password", {
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                email
            })
            
        }).then(res=>res.json())
        .then(data => {
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
                <h2>Instagram</h2>
                <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <button class="btn waves-effect waves-light #f50057 pink accent-3" onClick={()=>SendUserData()}>Reset Password
                </button>
            </div>
        </div>
    )
}

export default Reset;