import { Outlet } from "react-router"
import { useDataContext } from "./components/contexts/DataContext"
import ErrorServer from "./components/messages/ErrorServer";
import Success from "./components/messages/Success";
import Loading from "./components/messages/Loading";
import Navbar from "./components/navigation/Navbar";

function App() {

const {isDarkMode,isLoading} = useDataContext();

  return (
    <>
     <div className={`min-h-screen min-w-screen fixed z-[-10] duration-500 ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}></div>
     {isLoading && <Loading/>}
     <Navbar/>
     <ErrorServer/>
     <Success/>
    <Outlet/>
    </>
  )
}

export default App
