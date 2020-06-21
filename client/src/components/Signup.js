import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import M from 'materialize-css';

const Signup = () => {
    const history = useHistory();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState(undefined);


    useEffect(() => {
        if(url){
            uploadFields()
        }
    }, [url])
    const SendUserData = () => {
        if(image){
            uploadProfilePic();
        }
        else{
            uploadFields()
        }
        
    }

    const uploadFields = () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email", classes: "#f44336 red"})
            return;
        }
        fetch("/signup", {
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password,
                pic : url
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

    const uploadProfilePic = () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "insta-clone");
        data.append("cloud_name", "insta-images");
        fetch("https://api.cloudinary.com/v1_1/insta-images/image/upload", {
            method: "post",
            body: data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    return (
        <div className="login-card">
            <div className="card auth-card input-field">
                <h2>Picstagram</h2>
                <input type="text" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)} />
                <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <div className="file-field input-field">
                   <div className="btn">
                    <span>Upload Profie Picture</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
                    </div>
                <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
                </div>
                </div>
                <button class="btn waves-effect waves-light #f50057 pink accent-3" onClick={()=>SendUserData()}>Signup
                </button>
                <h5>
                    <Link to="/login">Already have an account ?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signup;