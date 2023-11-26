import { ReactNode } from "react";



export default function SimpleGrid({children} : {children : ReactNode}) {


    return <div className="simple-grid">
        {children}
    </div>

}