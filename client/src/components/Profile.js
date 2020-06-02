import React, {useEffect, useState, useContext} from 'react';
import {UserContext} from '../App';

const Profile = () => {
    const [myImages, setImages] = useState([]);
    const {state, dispatch} = useContext(UserContext);
    useEffect(()=> {
        fetch('/mypost', {
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result => {
            setImages(result.mypost)
        })
    }, [])
    return (
        <div style={{maxWidth:"1000px", margin:"50px auto"}}>
            <div style={{display: "flex", justifyContent: "space-around", margin:"18px 0px", borderBottom:"1px solid gray"}}>
                <div>
                    <img style={{width:"160px", height:"160px", borderRadius:"80px"}}
                      src={state ? state.pic : "loading"}
                    />
                </div>
                <div>
                    <h4>{state ? state.name : "loading"}</h4>
                    <h5>{state ? state.email : "loading"}</h5>
                    <div style={{display:"flex", justifyContent:"space-between", width:"110%"}}>
                        <h6>{myImages.length} posts</h6>
                        <h6>{state ? state.followers.length : "0"} Followers</h6>
                        <h6>{state ? state.following.length : "0"} Following</h6>
                    </div>
                </div>
            </div>
            
            
            <div className="gallery">
                {
                    myImages.map(item => {
                        return (
                            <img key={item._id} className="item" src={item.picture} alt={item.caption} />
                        )
                    })
                }
            </div>        
        </div>

    )
}

export default Profile;