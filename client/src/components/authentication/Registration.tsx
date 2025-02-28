import {  useForm } from "react-hook-form";
import { useDataContext } from "../contexts/DataContext";
import { useNavigate } from "react-router";



interface UserData {
  name: string;
  email: string;
  password: string;
    imageURL: string;
}

type RegistrationInputs = {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
      imageURL: string;
};


const Registration = () => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm<RegistrationInputs>();
  const { url, setIsLoading, timeoutForError,isDarkMode,timeoutForSuccess } = useDataContext();
  const navigate = useNavigate();


  const postUserData = async (data: UserData) => {
    setIsLoading(true);
        try{ const {repeatPassword, ...rest} = data;
        const response = await fetch(`${url}/api/users/register`, {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(rest)
        })

         await response.json();
      reset();
      timeoutForSuccess("Successfully Registered")
      setTimeout(() => {
        navigate("/")
      },1200)
    } catch (error:unknown) {
      timeoutForError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  const repeatPsw:string = watch("password");

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen pt-[5%] phone:mt-15 tablet:mt-10 desktop:mt-5">
        <form onSubmit={handleSubmit(postUserData)} className={`pt-5 flex items-center flex-col phone:w-[20rem] tablet:w-[25rem] desktop:w-[30rem]   rounded-2xl  ${isDarkMode ? "dark-card-color text-white duration-500" : "bg-white text-black duration-500"}`}>
          <p className="text-3xl font-semibold ">
            Registration
          </p>
          <label className="tomas-label outfit">*Name: </label>
          <input
            className={`tomas-input ${isDarkMode ? "placeholder:text-white/50 duration-500 " : "placeholder:text-gray-500 duration-500"}`}
            type="text"
            placeholder="ex: Johnny Bravo"
            {...register("name", {
              required: "Name is required",
              pattern: {
                value: /^[a-zA-Z0-9 ]{3,255}$/,
                message:
                  "Name must be 3 to 255 characters long, only allows spaces, letters and numbers",
              },
            })}
          ></input>
           {errors.name && 
           <p className={`text-sm outfit text-red-500  `}>{errors.name.message}</p>}
         
          <label className="tomas-label outfit">*Email: </label>
          <input
            className={`tomas-input ${isDarkMode ? "placeholder:text-white/50 duration-500 " : "placeholder:text-gray-500 duration-500"}`}
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
           {errors && 
           <p className={`text-sm outfit text-red-500  `}>{errors.email?.message}</p>}
          <label className="tomas-label outfit">Image URL: </label>
          <input
            className={`tomas-input ${isDarkMode ? "placeholder:text-white/50 duration-500 " : "placeholder:text-gray-500 duration-500"}`}
            type="text"
            placeholder="ex: https://example.com/image.jpg"
            {...register("imageURL", {
                pattern: {
                    value: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}([\/\w .-]*)*\/?[a-zA-Z0-9_-]+\.(jpg|jpeg|png|gif|bmp)$/i,
                    message: "Please enter a valid image URL (supports jpg, jpeg, png, gif, bmp)",
                  },
            })}
          ></input>
          {errors && <p className="text-sm outfit text-red-500">{errors.imageURL?.message}</p>}
          <label className="tomas-label outfit">*Password: </label>
          <input
           className={`tomas-input ${isDarkMode ? "placeholder:text-white/50 duration-500" : "placeholder:text-gray-500 duration-500"}`}
            type="password"
            placeholder="ex: *******"
            {...register("password", {
              required: "Can't be empty",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/\\|`~\-]).{8,50}$/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, one number,one special symbol and be from 8 to 50 characters long",
              },
            })}
          ></input>
          {errors && <p className="text-sm outfit text-red-500 text-center">{errors.password?.message}</p>}
          <label className="tomas-label outfit">*Repeat Password: </label>
          <input
           className={`tomas-input ${isDarkMode ? "placeholder:text-white/50 duration-500" : "placeholder:text-gray-500 duration-500"}`}
            type="password"
            placeholder="ex: *******"
            {...register("repeatPassword", {
              required: "Can't be empty",
              validate: value => value === repeatPsw || "Passwords must match",
              
            })}
          ></input>
          {errors && <p className="text-sm outfit text-red-500 text-center">{errors.repeatPassword?.message}</p>}

          <div>
          <button className="tomas-button me-10 mt-10" type="submit">Submit</button>
          <button className="tomas-button mb-5" onClick={() => navigate(-1)}>Go Back</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Registration;
