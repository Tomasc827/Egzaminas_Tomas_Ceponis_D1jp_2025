import { useState } from "react";

import { useDataContext } from "../contexts/DataContext";
import LightModeSvg from "../svgs/LightModeSvg";
import DarkModeSvg from "../svgs/DarkModeSvg";

const DarkModeToggle = () => {
    const {setIsDarkMode} = useDataContext()
    const [isStartingPoint,setIsStartingPoint] = useState<boolean>(false)


    return ( 
    <>
    <div className="flex ">
    <LightModeSvg/>
    <div onClick={() => {setIsDarkMode(prev => !prev)
                        setIsStartingPoint(prev => !prev)
    }} className="relative bg-white px-7 mx-1 rounded-full cursor-pointer select-none">
        <div className={`fg-navbar-color p-[10px] top-[10%] rounded-full left-[10%] absolute transition-all duration-500 ${isStartingPoint ? "translate-x-[27px]" : "-translate-x-0"}`}></div>
    </div>
        <DarkModeSvg />
    </div>
    </> );
}
 
export default DarkModeToggle;