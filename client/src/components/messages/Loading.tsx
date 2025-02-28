import { useEffect, useState } from "react";
import { useDataContext } from "../contexts/DataContext";


const Loading = () => {

    const {isLoading} = useDataContext()
    const [dots,setDots] = useState<string>("")

    useEffect(() => {
        if(!isLoading) return;

        const interval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? "" : prev + ".")
        },350)
        return () => clearInterval(interval);
    })
    return ( <>
    <div className="fixed z-[100] bg-black/30 min-h-screen min-w-screen  flex justify-center items-center">
        <div>
        <p className="text-5xl text-white">Loading{isLoading && dots}</p>
        </div>
    </div>

    </> );
}
 
export default Loading;