import { createContext, ReactNode, useContext, useEffect, useState } from "react"

interface Entity {
    id: number;
    name: string;
    imageURL:string;
}

type DataContextType = {
url:string;
isLoading: boolean;
setIsLoading: (isLoading: boolean) => void;
error: string;
setError: (error: string) => void;
success: string;
timeoutForError: (message:string) => void;
timeoutForSuccess: (message:string) => void;
isDarkMode: boolean;
updateHomepage: number;
setUpdateHomepage: (updateHomepage: number) => void;
setIsDarkMode: (isDarkMode: boolean) => void;
windowSize: {
    width: number
}
entity: Entity[];
setEntity: (entity: Entity[]) => void;
}

const DataContext = createContext<DataContextType>({
    url: "http://localhost:8080",
    isLoading: false,
    setIsLoading: () => {},
    error: "",
    setError:() => {},
    success: "",
    timeoutForError: () => {},
    timeoutForSuccess: () => {},
    isDarkMode: false,
    updateHomepage: 0,
    setUpdateHomepage: () => {},
    setIsDarkMode: () => {},  
    windowSize: {
        width:0
    },
    entity: [],
    setEntity: () => {}
    }

)




export const useDataContext = () => {
    return useContext(DataContext);
}

export const DataProvider = ({children}:{children:ReactNode}) => {
 const url: string = "http://localhost:8080";
 const [isLoading,setIsLoading] = useState<boolean>(false);
 const [error,setError] = useState<string>("");
 const [success,setSuccess] = useState<string>("");
 const [isDarkMode,setIsDarkMode] = useState<boolean>(false);
 const [updateHomepage,setUpdateHomepage] = useState<number>(0)

 const [entity,setEntity] = useState<Entity[]>([])

 const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
});

useEffect(() => {
    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
        });
    };

    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
    };
}, []);



 const timeoutForError = (message: string) => {
    setError(message);
    setTimeout(() => {
        setError("");
    },2500)
 }

 const timeoutForSuccess = (message:string) => {
    setSuccess(message);
    setTimeout(() => {
        setSuccess("");
    },1500)
 }

 return (
    <DataContext.Provider value={{url,isLoading, error,success,timeoutForError,timeoutForSuccess,setIsLoading,setError,isDarkMode,setIsDarkMode,windowSize,updateHomepage,setUpdateHomepage,entity,setEntity}}>
        {children}
    </DataContext.Provider>
 )
}