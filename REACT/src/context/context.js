import React, { createContext, useState } from "react";
export const PageContext = createContext();

export function PageProvider({ children }) {
    const [loged, setLoged] = useState(document.cookie.split("=")[0] === "SID" ? true : false);
    const [userLevel, setUserLevel] = useState(0);
    const [eventId, setEventId] = useState(null);
    
    // console.log("loged: ",loged, "userLEvel: ", userLevel)

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
