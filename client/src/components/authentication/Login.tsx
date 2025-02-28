import { useForm } from "react-hook-form";
import { useDataContext } from "../contexts/DataContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";


type LoginInputs = {
    email: string,
    password: string,
}

const Login = () => {

    const {register,formState:{errors},handleSubmit, reset} = useForm<LoginInputs>();
    const {url, setIsLoading,timeoutForError,timeoutForSuccess, isDarkMode} = useDataContext();
    const {login} = useAuth();
    const navigate = useNavigate()

    const postToken = async (data: LoginInputs) => {
    setIsLoading(true)
    try {
        const changedData = {
            ...data,
            email: data.email.toLowerCase()
        }
        const response = await fetch(`${url}/api/token` , {
            method: "POST",
            headers: {
                "Authorization": "Basic " +  btoa(`${changedData.email}:${changedData.password}`)
            },
        })
        if(!response.ok) {
           timeoutForError("Incorrect email or password");
           return;
        } else {
            const token = await response.text()
            login(token);
            timeoutForSuccess("Successfully logged in")
            reset();
            setTimeout(() => {
                navigate("/homepage") 
            },1000)
        }
    } catch (error:unknown) {
        timeoutForError(error as string);
    } finally {
        setIsLoading(false);
    }

    } 




    return ( 
        <>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <form onSubmit={handleSubmit(postToken)} className={`pt-5 flex items-center flex-col phone:w-[20rem] tablet:w-[25rem] desktop:w-[30rem]   rounded-2xl  ${isDarkMode ? "dark-card-color text-white duration-500" : "bg-white text-black duration-500"}`}>
          <p className="text-3xl font-semibold ">
            Login
          </p>
          <label className="tomas-label outfit">Email: </label>
          <input
             className={`tomas-input  ${isDarkMode ? "placeholder:text-white/50 duration-500" : " placeholder:text-gray-500 duration-500"}`}
            type="text"
            placeholder="ex: Johnny@Bravo.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^[a-zA-Z0-9%+-]+(\.[a-zA-Z0-9%+-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,255}$/,

                message: "Invalid email format",
              },
            })}
          ></input>
          {errors && <p className="text-sm outfit text-red-500">{errors.email?.message}</p>}
          <label className="tomas-label outfit">Password: </label>
          <input
             className={`tomas-input mb-10 ${isDarkMode ? "placeholder:text-white/50 duration-500" : "placeholder:text-gray-500 duration-500"}`}
            type="password"
            placeholder="ex: *******"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/\\|`~\-]).{8,50}$/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, one number,one special symbol and be from 8 to 50 characters long",
              },
            })}
          ></input>
          {errors && <p className="text-sm outfit text-red-500 text-center">{errors.password?.message}</p>}
          <div>
          <button className="tomas-button me-10" type="submit">Login</button>
          <button className="tomas-button mb-5" onClick={() => navigate(-1)}>Go Back</button>
          </div>
        </form>
      </div>
    </>
     );
}
 
export default Login;