import { useNavigate, useParams } from "react-router";
import { useDataContext } from "./contexts/DataContext";
import { useAuth } from "./contexts/AuthContext";
import { useEffect, useState } from "react";
import UpdateModal from "./modals/UpdateModal";

const Card = () => {
  const { entityID } = useParams();

  const { entity, isDarkMode,setIsLoading,timeoutForError,url,timeoutForSuccess,isLoading } = useDataContext();
  const { roles,userId } = useAuth();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [isModalOpen,setIsModalOpen] = useState<boolean>(false);
  const [update, setUpdate] = useState<number>(0)
    const navigate = useNavigate();

    const [currentEntity, setCurrentEntity] = useState<any>(null);

  
    useEffect(() => {
        const contextEntity = entity.find(
          (one) => one.id?.toString() === entityID?.toString()
        );
    
        if (contextEntity) {
          setCurrentEntity(contextEntity);
        } else {
          fetchEntityById();
        }
      }, [entityID, entity]);
  
    const fetchEntityById = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${url}/api/entity/${entityID}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });
        
        if (!response.ok) {
          timeoutForError("Entity Not Found");
          return;
        }
        
        const data = await response.json();
        setCurrentEntity(data);
      } catch (error) {
        timeoutForError("Failed to load entity data");
      } finally {
        setIsLoading(false);
      }
    };


  const handleDelete = async () => {
    if (!currentEntity) return;
    setIsLoading(true);
    try {
        await fetch(`${url}/api/entity/${currentEntity.id}`, {
            method:"DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        timeoutForSuccess(`Successfully deleted ${currentEntity.name}`)
        setTimeout(() => {
            navigate("/homepage")
        },500)
        
    } catch (error:unknown) {
        timeoutForError(error as string)
    } finally {
        setIsLoading(false);
    }
  }

  useEffect(() => {
    if (update > 0) { 
      fetchEntityById();
      setUpdate(0); 
    }
  }, [update]);

  if (isLoading || !currentEntity) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className={isDarkMode ? "text-white" : "text-black"}>Loading...</p>
      </div>
    );
  }

  return (
    <>
    {isModalOpen && <UpdateModal setIsModalOpen={setIsModalOpen}
    currentEntity={currentEntity}
    setUpdate={setUpdate}/>}
    
      {deleteModal && currentEntity && (
        <div className="fixed flex justify-center items-center bg-black/30 min-h-screen min-w-screen z-40">
            <div className={`p-5 rounded-2xl ${isDarkMode ? "text-white dark-card-color" : "text-red-500 bg-white"}`}>
            <p className="text-2xl">Are you sure you want to delete {currentEntity.name}?</p>
            <div className="mt-5 flex justify-center gap-10">
            <button
            onClick={handleDelete}
                className="tomas-button hover:shadow-red-500 hover:shadow-2xl">
                  Yes
                </button>
            <button
                  className="tomas-button"
                  onClick={() => setDeleteModal(false)}
                >
                  No
                </button>
            </div>
            </div>
        </div>
      )}
      <div className="flex flex-col  justify-center items-center min-h-screen">
        <div
          className={`  rounded-2xl ${
            isDarkMode ? "dark-card-color text-white" : "bg-white text-black"
          }`}
        >
          <p className="font-bold text-center capitalize py-5">{currentEntity.name}</p>
          <img
            className="w-[20rem] h-[20rem]"
            src={currentEntity.imageURL}
            alt="content-image"
          ></img>
          <p className={`capitalize pt-1 font-bold text-center`}><span className="font-normal">Location:</span> {currentEntity.location}</p>
          <p className={`capitalize pt-1 font-bold text-center`}><span className="font-normal">Price:</span> {currentEntity.price}</p>
          <p className={`capitalize pt-1 text-center font-bold`}><span className="font-normal">Category:</span> {currentEntity.category?.name || "No category"}</p>
          <p className={`capitalize pt-1 ps-10`}><span className=" font-bold">Description:</span></p>
          <p className="font-bold px-10 max-w-[20rem] break-words whitespace-normal overflow-wrap-break-word">
  <span className="font-normal">{currentEntity.description}</span>
</p>

          <div className="flex justify-between p-5">
            {(roles.includes("ROLE_ADMIN") || String(currentEntity.usersId) === userId) && (
              <>
                <button
                onClick={() => setIsModalOpen(true)}
                  className="tomas-button "
                >
                  Update
                </button>
                <button
                                  onClick={() => setDeleteModal(true)}
                className="tomas-button hover:shadow-red-500 hover:shadow-2xl">
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
