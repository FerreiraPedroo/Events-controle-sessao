import React, { useContext, useEffect, useState } from "react";
import { PageContext } from "../../context/context";
import axios from "axios";
// import "./Event.css";

async function loadEventData(setLoged, setDataEvent) {
    await axios(
        {
            method: "post",
            url: "http://127.0.0.1:8000/admin/data",
            data: {
                retrieve: "event"
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
                setDataEvent(axiosRes.getBackData);
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

function EventPage() {
    const [dataEvent, setDataEvent] = useState();
    const { loged, setLoged } = useContext(PageContext);

    useEffect(() => {
        (async () => {
            await loadEventData(setLoged, setDataEvent);
        })()
        console.log(dataEvent)
    }, [])

    if (dataEvent === undefined) { return <></> };
    return (
 











        <>
        {
            dataEvent.map((event)=>{
                return(
                    <div>{JSON.stringify(event)}</div>
                )
            })
        }
        











        </>
    );
}
export default EventPage;