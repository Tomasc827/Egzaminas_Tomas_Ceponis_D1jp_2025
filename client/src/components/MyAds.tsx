import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDataContext } from "./contexts/DataContext";

const MyAds = () => {
    const { url, setIsLoading, timeoutForError, isDarkMode, setEntity, updateHomepage } = useDataContext();
    const [allEntities, setAllEntities] = useState([]);

  
    const navigate = useNavigate();
  
    const getAllEntity = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${url}/api/entity/my`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}` 
          },
        });
        
        
        const entityData = await response.json();
        
        if (Array.isArray(entityData)) {
          setAllEntities(entityData);
          setEntity(entityData);
        } else {

          setAllEntities([]);
        }
      } catch (error) {

        timeoutForError(error);
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      getAllEntity();
    }, [updateHomepage]);
  

    return (
      <>
        {!allEntities || allEntities.length === 0 ? (
          <div className={`text-2xl flex justify-center items-center fixed inset-0 ${isDarkMode ? "text-white" : "text-black"}`}>
            No content to show
          </div>
        ) : (
          <div className={`pb-10 grid mx-[10%] phone:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 pt-[13rem] gap-8 items-center text-center ${isDarkMode ? "text-white" : "text-[#5964e0]"}`}>
            {allEntities.map((one) => (
              <div 
                onClick={() => navigate(`/${one.id}`)}
                className={`rounded-2xl duration-500 hover:-translate-y-3 cursor-pointer ${isDarkMode ? "dark-card-color" : "bg-white"}`} 
                key={one.id}
              >
                <p className={`capitalize font-bold py-5`}>{one.name }</p>
                <img 
                  className="w-[100%] desktop:h-[15rem] tablet:h-[20rem] phone:h-[25rem]" 
                  src={one.imageURL || "https://via.placeholder.com/300"} 
                />
                <p className={`capitalize py-3`}>{one.name || "Unnamed Item"}</p>
                <p className={`capitalize pt-1 font-bold`}><span className="font-normal">Location:</span> {one.location  }</p>
                <p className={`capitalize pt-1 font-bold`}><span className="font-normal">Price:</span> {one.price }</p>
                <p className={`capitalize pt-1 font-bold`}><span className="font-normal">Category:</span> {one.category?.name }</p>
              </div>
            ))}
          </div>
        )}
      </>
    );
  };
 
export default MyAds;