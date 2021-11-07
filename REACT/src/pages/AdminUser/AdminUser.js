import React, { useContext, useEffect, useState } from "react";
import { PageContext } from "../../context/context";
import axios from "axios";
// import "./User.css";

async function loadUserData(setLoged, setDataUser) {
    await axios(
        {
            method: "post",
            url: "http://127.0.0.1:8000/admin/data",
            data: {
                retrieve: "adminuser"
            },
            headers: {
                "Access-Control-Allow-Origin": "http://127.0.0.1:3000"
            },
            withCredentials: true
        }
    ).then((response) => {
        let axiosRes = response.data;
        if (axiosRes.code === "20") {
            if (document.cookie.split("=")[0] === "SID" ? true : false) {
                setDataUser(axiosRes.getBackData);
            } else {
                setLoged(false);
            }
        } else {
            setLoged(false);
        }
    }).catch((response) => {
        setLoged(false);
    })
}

function AdminUser() {
    const [dataUser, setDataUser] = useState();
    const { loged, setLoged } = useContext(PageContext);

    useEffect(() => {
        (async () => {
            await loadUserData(setLoged, setDataUser);
        })()
        console.log(dataUser)
    }, [])

    if (dataUser === undefined) { return <></> };
    return (








        <>
        {
            dataUser.map((user)=>{
                return(
                    <div>{JSON.stringify(user)}</div>
                )
            })
        }
        
        </>








    );
}
export default AdminUser;