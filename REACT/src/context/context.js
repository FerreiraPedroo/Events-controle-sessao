import React, { createContext, useState } from "react";
export const PageContext = createContext();

export function PageProvider({ children }) {
    const [loged, setLoged] = useState(document.cookie.split("=")[0] === "SID" && document.cookie.split("=")[1] !== "" ? true : false);
    const [userLevel, setUserLevel] = useState(0);
    const [eventId, setEventId] = useState(null);
    
    console.log("CONTEXT: loged: ",loged, "userLEvel: ", userLevel, " - COOKIE: ", document.cookie)

    return (
        <PageContext.Provider
            value={{
                loged,
                setLoged,
                userLevel,
                setUserLevel,
                eventId,
                setEventId
            }}>
            {children}
        </PageContext.Provider>
    )
}
