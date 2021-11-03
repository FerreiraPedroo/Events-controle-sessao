import React, { createContext, useState } from "react";
export const PageContext = createContext();

export function PageProvider({ children }) {
    const [loged, setLoged] = useState(document.cookie.split("=")[0] === "SID" ? true : false);



    
    console.log("loged",loged)


    return (
        <PageContext.Provider
            value={{
                loged,
                setLoged
            }}>
            {children}
        </PageContext.Provider>
    )
}
