import { createContext, useState, useContext } from "react";


const SizeContext = createContext({
    setSize: ()=>{},
    size: "vw"
})

export const SizeProvider = ({children})=> {

    const [size, setSize] = useState("vw")

    return <SizeContext.Provider value={
        {
            size,
            setSize
        }
    }>
        {children} 
    </SizeContext.Provider>
} 

export function useSize(){
    const context = useContext(SizeContext)
    return context
}