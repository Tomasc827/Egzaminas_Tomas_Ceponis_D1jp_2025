import { useEffect, useState } from "react";
import { useDataContext } from "../contexts/DataContext";
import defaultImage from "../../assets/default.jpg"


const UserAvatar = ({setIsAvatarOpen}) => {
    const {url,setIsLoading,timeoutForError} = useDataContext();
    const [avatar,setAvatar] = useState<string>("")


    const getUserAvatar = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${url}/api/users/avatar`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
        const avatar: string = await response.text();
        console.log(avatar)
        setAvatar(avatar);
        } catch (error:unknown) {
            timeoutForError(error as string);
        } finally{
            setIsLoading(false);
        }
    }
    
    useEffect(() => {
        getUserAvatar();
    },[])
    
    return ( 
        <button onClick={() => setIsAvatarOpen(prev => !prev)} className=" ms-2 border-2 border-white rounded-full w-14 h-14 duration-500 cursor-pointer hover:border-purple-500 focus:border-purple-500 focus:shadow-md focus:shadow-pink-500">
        <img className="rounded-full w-13 h-13"
         src={avatar || defaultImage}
        alt="user-avatar">
        </img>
        </button>
     );
}
 
export default UserAvatar;