import { useForm } from "react-hook-form";
import { useDataContext } from "../contexts/DataContext";

interface Entity {
    name: string,
}

type EntityInputs = Entity;

const AdCategoryModal = ({setIsCategoryOpen}) => {
    const {handleSubmit, formState:{errors}, reset, register} = useForm<EntityInputs>();
    const {isDarkMode,setIsLoading,url,timeoutForError,timeoutForSuccess,setUpdateHomepage} = useDataContext();

    const postJobAd = async (data) => {
        setIsLoading(true);
        try {

            const response = await fetch(`${url}/api/categories/add`, {
                method:"POST",
                headers: {
                    "Authorization": `bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                await response.json();
                timeoutForSuccess("Entity posted successfully")
                setTimeout(() => {
                    setIsCategoryOpen(false);
                    setUpdateHomepage(prev => prev + 1)
                },1000)
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

    

    return ( 
        <>
  <div className="fixed flex justify-center items-center bg-black/30 min-h-screen min-w-screen z-40">
    <form onSubmit={handleSubmit(postJobAd)}  className={`pt-5 flex items-center flex-col phone:w-[20rem] tablet:w-[25rem] desktop:w-[30rem]   rounded-2xl  ${isDarkMode ? "dark-card-color text-white duration-500" : "bg-white text-black duration-500"}`}>
          <p className="text-3xl font-semibold text-center">
            Add Advertisement
          </p>
          <label className="tomas-label outfit">Name: </label>
          <input
             className={`tomas-input ${isDarkMode ? "placeholder:text-white/50  duration-500" : "placeholder:text-gray-500 duration-500"}`}
            type="text"
            placeholder="ex: Tool"
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
          <div className="mt-10">
          <button className="tomas-button me-10" type="submit">Post</button>
          <button type="button" className="tomas-button mb-5" onClick={() => {setIsCategoryOpen(false)
            reset();
          }}>Close</button>
          </div>
          </form>
    </div>
    </>
     );
}
 
export default AdCategoryModal;