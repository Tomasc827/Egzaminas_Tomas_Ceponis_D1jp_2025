import { useNavigate } from "react-router";
import { useDataContext } from "../contexts/DataContext";

const Unauthorized = () => {
    const {isDarkMode} = useDataContext();

    const navigate = useNavigate();

    return ( 
        <>
        <div className={`flex flex-col justify-center duration-500 items-center min-h-screen ${isDarkMode ? "text-white" : ""}`}>
        <p className={`text-9xl font-bold`}>403</p>
        <p className={`text-2xl font-bold`}>Unauthorized</p>
        <button onClick={() => navigate("/homepage")} className="tomas-button mt-5">Go Back to Homepage</button>
        </div>
        </>
     );
}
 
export default Unauthorized;