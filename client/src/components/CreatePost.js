import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import M from 'materialize-css';

const CreatePost = () => {
    const history = useHistory();
    const [caption, setCaption] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");

    useEffect(() => {
        if(url){
            fetch("/createpost", {
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer " +localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    caption,
                    body,
                    img:url
                })
            }).then(res=>res.json())
            .then(data => {
                if(data.error){
                    M.toast({html: data.error, classes: "#f44336 red"});
                }
                else{
                    M.toast({html: "Image uploaded", classes: "#4caf50 green"});
                    history.push('/')
                }
            }).catch(err=>{
                console.log(err);
            })
        }
    }, [url])


    const postData = () => {
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
    return(
        <div className="card input-field" style={{maxWidth:"500px", margin:"50px auto", padding:"30px", textAlign:"center"}}>
            <input type="text" placeholder="caption" value={caption} onChange={(e)=>setCaption(e.target.value)} />
            <input type="text" placeholder="body" value={body} onChange={(e)=>setBody(e.target.value)} />
            <div className="file-field input-field">
               <div className="btn">
               <span>Upload Image</span>
               <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
               </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            <button class="btn waves-effect waves-light #f50057 pink  darken-1" onClick={()=>postData()}>Submit
            </button>
        </div>
    )
}

export default CreatePost;