import { useForm } from "react-hook-form";
import { useDataContext } from "../contexts/DataContext";
import React, { useEffect, useState} from "react";


interface PropsModal {
    setIsModalOpen: (value:boolean) => void;
    currentEntity: Entity
    setUpdate: (value:number) => void;
}

interface Entity {
    id: number,
    name: string,
    imageURL: string,
}

type EntityInputs = Entity;

const UpdateModal: React.FC<PropsModal> = ({setIsModalOpen,currentEntity,setUpdate}) => {
    const {handleSubmit, formState:{errors}, register,setValue} = useForm<EntityInputs>();
    const {isDarkMode,setIsLoading,url,timeoutForError,timeoutForSuccess} = useDataContext();
    const [categories,setCategories] = useState([])
    

    const postJobAd = async (data:Entity) => {
        setIsLoading(true);
        try {

            const response = await fetch(`${url}/api/entity/update/${currentEntity.id}`, {
                method:"PUT",
                headers: {
                    "Authorization": `bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                await response.json();
                timeoutForSuccess("Entity updated successfully")
                setIsModalOpen(false);
                setUpdate(prev => prev + 1)
            } else {
                switch (response.status) {
                    case 401: timeoutForError("Unauthenticated")
                    break;
                    case 403: timeoutForError("Unauthorized")
                    break;
                    case 400: timeoutForError("Bad Request, adjust inputs")
                }
            }
        } catch (error:unknown) {
            timeoutForError(error as string)
        } finally {
            setIsLoading(false);
        }
    }

    const [localLoading, setLocalLoading] = useState(false);

    const getAllCategories = async () => {
      setLocalLoading(true)
     
      try {
        const response = await fetch(`${url}/api/categories/all`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        timeoutForError(error);
      } finally {

        setLocalLoading(false)
      }
    };

    useEffect(() => {
      let isMounted = true;
      
      if (!categories.length) {
        getAllCategories();
      }
      
      return () => {
        isMounted = false;
      };
    }, []);


    useEffect(() => {
      if (currentEntity) {
      setValue("name",currentEntity.name)
      setValue("imageURL",currentEntity.imageURL)
      setValue("location",currentEntity.location)
      setValue("description",currentEntity.description)
      setValue("price",currentEntity.price)
      setValue("category",currentEntity.category?.name || "no category")
      }
    },[currentEntity,setValue])


    return ( 
      <>
      <div className="fixed flex justify-center items-center bg-black/30 min-h-screen min-w-screen z-40">
      <form onSubmit={handleSubmit(postJobAd)}  className={`pt-5 flex items-center flex-col phone:w-[20rem] tablet:w-[25rem] desktop:w-[30rem]   rounded-2xl  ${isDarkMode ? "dark-card-color text-white duration-500" : "bg-white text-black duration-500"}`}>
            <p className="text-3xl font-semibold text-center">
              Update Advertisement
            </p>
            <label className="tomas-label outfit">Name: </label>
            <input
               className={`tomas-input ${isDarkMode ? "placeholder:text-white/50  duration-500" : "placeholder:text-gray-500 duration-500"}`}
              type="text"
              placeholder="ex: Selling Shovel"
              {...register("name", {
                required: "Name is required",
                pattern: {
                  value:
                    /^[a-zA-Z0-9 !.,£$%^&*(){}:;'#`~_-]{2,1000}$/,
  
                  message: "Name includes only letters, numbers and symbols .,!£$-&",
                },
              })}
            ></input>
            {errors && <p className="text-sm outfit text-red-500">{errors.name?.message}</p>}
  
            <label className="tomas-label outfit">Image URL: </label>
            <input
              className={`tomas-input ${isDarkMode ? "placeholder:text-white/50 duration-500 " : "placeholder:text-gray-500 duration-500"}`}
              type="text"
              placeholder="ex: https://example.com/image.jpg"
              {...register("imageURL", {
                  pattern: {
                      value: /^(|https?:\/\/(?:[a-zA-Z0-9\-._~!$&'()*+,;=:@\/]|%[0-9A-F]{2})+)$/,
                      message: "Please enter a valid image URL",
                    },
              })}
            ></input>
            {errors && <p className="text-sm outfit text-red-500">{errors.imageURL?.message}</p>}
            <label className="tomas-label outfit">Location: </label>
            <input
               className={`tomas-input ${isDarkMode ? "placeholder:text-white/50  duration-500" : "placeholder:text-gray-500 duration-500"}`}
              type="text"
              placeholder="ex: Okinawa"
              {...register("location", {
                required: "Location is required",
                pattern: {
                  value:
                    /^[a-zA-Z0-9 !.,£$%^&*(){}:;'#`~_-]{2,1000}$/,
  
                  message: "Location includes only letters, numbers and symbols .,!£$-&",
                },
              })}
            ></input>
            {errors && <p className="text-sm outfit text-red-500">{errors.location?.message}</p>}
  
            <label className="tomas-label outfit">Price: </label>
            <input
    className={`tomas-input ${isDarkMode ? "placeholder:text-white/50 duration-500" : "placeholder:text-gray-500 duration-500"}`}
    type="number"
    step="0.01"
    placeholder="ex: 8.99"
    {...register("price", {
      required: "Price is required",
      pattern: {
        value: /^\d+(\.\d{1,2})?$/,
        message: "Price must be a number with up to 2 decimal places",
      },
    })}
  />
            {errors && <p className="text-sm outfit text-red-500">{errors.price?.message}</p>}
  
            <label className="tomas-label outfit">Description: </label>
            <textarea
               className={`tomas-input py-10 ${isDarkMode ? "placeholder:text-white/50  duration-500" : "placeholder:text-gray-500 duration-500"}`}
              
              placeholder="ex: Shovel is nice"
              {...register("description", {
                required: "Description is required",
                pattern: {
                  value:
                    /^[a-zA-Z0-9 !.,£$%^&*(){}:;'#`~_-]{2,1000}$/,
  
                  message: "Description includes only letters, numbers and symbols .,!£$-&",
                },
              })}
                       rows=""
            cols="40"
            ></textarea>
            {errors && <p className="text-sm outfit text-red-500">{errors.description?.message}</p>}
  
            <select
                        {...register("category", {
                          required: "Category is required",
                        })}
              defaultValue=""
              className={`w-[100%] tomas-select cursor-pointer duration-500 text-[#5964e0]`}
            >
              <option
                className={`text-center pt-5  ${
                  isDarkMode && "bg-gray-900 text-white"
                }`}
                disabled
                value=""
              >
                Choose Category
              </option>
              {categories.map((category,index) => (
                <option key={index} className="text-center capitalize">{category.name}</option>
              ))}
  
              </select>
              {errors && <p className="text-sm outfit text-red-500">{errors.category?.message}</p>}
  
            
  
            <div className="mt-10">
            <button className="tomas-button me-10" type="submit">Post</button>
            <button type="button" className="tomas-button mb-5" onClick={() => {setIsModalOpen(false)
            }}>Close</button>
            </div>
            </form>
      </div>
      </> );
}
 
export default UpdateModal;