import { useEffect, useState } from "react";
import { useDataContext } from "../contexts/DataContext";


const ErrorServer = () => {
    const { error, setError } = useDataContext()
    const [isVisible, setIsVisible] = useState<boolean>(false);
   
  
    useEffect(() => {
      let hideTimeout: number | undefined;
      
      if (error) {
        setIsVisible(false);
        
        const showTimeout = setTimeout(() => {
          setIsVisible(true);
          
          hideTimeout = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
              setError("");
            }, 500);
          }, 2500);
        }, 50);
  
        return () => {
          clearTimeout(showTimeout);
          clearTimeout(hideTimeout);
        };
      }
    }, [error, setError]);
  
    if (!error) return null;
  
    return (
      <div className="relative">
        <div
          className={`z-[100] fixed top-[12%] left-[1%] bg-gradient-to-r from-purple-800 to-blue-500 border-l-4 border-r-4 border-red-500 text-white p-6 rounded-3xl shadow-lg shadow-purple-500 transition-all duration-500 ease-out ${
            isVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          }`}
        >
          <p className="text-[1.1rem]">{error}</p>
        </div>
      </div>
    );
  };
  
  export default ErrorServer;