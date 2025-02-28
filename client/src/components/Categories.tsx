import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDataContext } from "./contexts/DataContext";
import { useAuth } from "./contexts/AuthContext";

const Categories = () => {
    const { url, setIsLoading, timeoutForError, timeoutForSuccess, isDarkMode, setEntity, updateHomepage } = useDataContext();
    const {roles, userId} = useAuth();
    const [allEntities, setAllEntities] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [updateModal, setUpdateModal] = useState(false);
  
    const navigate = useNavigate();
  
    const getAllEntity = async () => {
        setIsLoading(true);
      try {
        const response = await fetch(`${url}/api/categories/my`, {
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
        timeoutForError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    const handleDelete = async (categoryId) => {
      setIsLoading(true);
      try {
        const response = await fetch(`${url}/api/categories/delete/${categoryId}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        
        if (response.ok) {
          timeoutForSuccess("Category deleted successfully");
          setAllEntities(allEntities.filter(cat => cat.id !== categoryId));
          setDeleteModal(false);
        } else {
          timeoutForError("Failed to delete category");
        }
      } catch (error) {
        timeoutForError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    const handleUpdate = async (categoryId, newName) => {
      setIsLoading(true);
      try {
        const response = await fetch(`${url}/api/categories/update/${categoryId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({ name: newName })
        });
        
        if (response.ok) {
          const updatedCategory = await response.json();
          timeoutForSuccess("Category updated successfully");
          

          setAllEntities(allEntities.map(cat => 
            cat.id === categoryId ? { ...cat, name: newName } : cat
          ));
          
          setUpdateModal(false);
        } else {
          timeoutForError("Failed to update category");
        }
      } catch (error) {
        timeoutForError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      getAllEntity();
    }, [updateHomepage]);
  
    return (
      <>

        {deleteModal && selectedCategory && (
          <div className="fixed flex justify-center items-center bg-black/30 min-h-screen min-w-screen z-40">
            <div className={`p-5 rounded-2xl ${isDarkMode ? "text-white dark-card-color" : "text-red-500 bg-white"}`}>
              <p className="text-2xl">Are you sure you want to delete {selectedCategory.name}?</p>
              <div className="mt-5 flex justify-center gap-10">
                <button
                  onClick={() => handleDelete(selectedCategory.id)}
                  className="tomas-button hover:shadow-red-500 hover:shadow-2xl"
                >
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
        

        {updateModal && selectedCategory && (
          <div className="fixed flex justify-center items-center bg-black/30 min-h-screen min-w-screen z-40">
            <div className={`p-5 rounded-2xl ${isDarkMode ? "text-white dark-card-color" : "text-black bg-white"}`}>
              <p className="text-2xl">Update category name</p>
              <input 
                type="text"
                className={`tomas-input mt-4 ${isDarkMode ? "text-white" : "text-black"}`}
                defaultValue={selectedCategory.name}
                id="categoryNameInput"
              />
              <div className="mt-5 flex justify-center gap-10">
                <button
                  onClick={() => {
                    const newName = document.getElementById('categoryNameInput').value;
                    handleUpdate(selectedCategory.id, newName);
                  }}
                  className="tomas-button"
                >
                  Update
                </button>
                <button
                  className="tomas-button"
                  onClick={() => setUpdateModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {!allEntities || allEntities.length === 0 ? (
          <div className={`text-2xl flex justify-center items-center fixed inset-0 ${isDarkMode ? "text-white" : "text-black"}`}>
            No content to show
          </div>
        ) : (
          <div className={`pb-10 grid mx-[10%] phone:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 pt-[13rem] gap-8 items-center text-center ${isDarkMode ? "text-white" : "text-[#5964e0]"}`}>
            {allEntities.map((one) => (
              <div 
                className={`rounded-2xl duration-500 cursor-pointer ${isDarkMode ? "dark-card-color" : "bg-white"}`} 
                key={one.id}
              >
                <p className={`capitalize font-bold py-5`}>{one.name}</p>
                {(roles.includes("ROLE_ADMIN") || String(one.userId) === userId) && (
                  <>
                    <button 
                      onClick={() => {
                        setSelectedCategory(one);
                        setUpdateModal(true);
                      }}
                      className="tomas-button me-5"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCategory(one);
                        setDeleteModal(true);
                      }}
                      className="tomas-button hover:shadow-red-500 hover:shadow-2xl mb-5"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </>
    );
};
 
export default Categories;