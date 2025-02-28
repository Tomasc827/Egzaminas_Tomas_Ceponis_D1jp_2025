import { useEffect, useState } from "react";
import { useDataContext } from "./contexts/DataContext";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router";

interface Entity {
  id: number;
  name: string;
  imageURL: string;
}

interface EntityResponse {
    content: Entity[];
    totalPages: number;
    totalElements: number;
    last: boolean;
  }

const Homepage = () => {
  const { url, setIsLoading, timeoutForError,isDarkMode,setEntity,updateHomepage } = useDataContext();
  const [size,setSize] = useState<number>(8);
  const [direction,setDirection] = useState<string>("")
  const [sortBy,setSortBy] = useState<string>("");
  const [page,setPage] = useState<number>(0)
  const [lastPage,setLastPage] = useState<boolean>(false)
  const [name,setName] = useState<string>("")
  const [allEntities,setAllEntities] = useState<Entity[]>([])

  const navigate = useNavigate();

  const getAllEntity = async (currentPage: number,fetchSize: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${url}/api/entity/all?page=${currentPage}&size=${fetchSize}&direction=${direction}&sortBy=${sortBy}&name=${name}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const entityData: EntityResponse = await response.json();
      if (currentPage === 0) {
        setAllEntities(entityData.content);
      } else {
        setAllEntities((prev) => {
          const existingIds = new Set(prev.map(entity => entity.id));
          const newEntities = entityData.content.filter(entity => !existingIds.has(entity.id));
          
          return [...prev, ...newEntities];
        });
      }
      setEntity(entityData.content);
      setLastPage(entityData.last)
    } catch (error: unknown) {
      timeoutForError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    getAllEntity(nextPage,size)
  }

  const handleSearch = () => {
    setPage(0);
    setAllEntities([]);
    getAllEntity(0,size);
  }

  useEffect(() => {
    getAllEntity(0,size);
  }, [updateHomepage]);

  return (
    <>
    <div className="relative">
    <SearchBar setDirection={setDirection}
    setSortBy={setSortBy}
    direction={direction}
    sortBy={sortBy}
    name={name}
    setName={setName}
    setPage={setPage}
    setSize={setSize}
    getAllEntity={handleSearch}/>
    </div>
      {allEntities.length === 0 ? (
        <div className={`text-2xl flex justify-center items-center fixed inset-0 ${isDarkMode && "text-white"}`}>
          No content to show
        </div>
      ) : (
        <>
        <div className={`pb-10 grid mx-[10%] phone:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 pt-[13rem] gap-8 items-center text-center ${isDarkMode ? "text-white" : "text-[#5964e0]"}`}>
            {allEntities.map((one) => (
                <div onClick={() => navigate(`/${one.id}`)}
                 className={`rounded-2xl duration-500 hover:-translate-y-3 cursor-pointer ${isDarkMode ? "dark-card-color" : "bg-white"}`} key={one.id}>
                    <p className={`capitalize font-bold py-5`}>{one.name}</p>
                    <img className="w-[100%] desktop:h-[15rem] tablet:h-[20rem] phone:h-[25rem] bg-cover" src={one.imageURL} alt="content-image"></img>
                    <p className={`capitalize py-3`}>{one.name}</p>
                    <p className={`capitalize pt-1 font-bold`}><span className="font-normal">Location:</span> {one.location}</p>
                    <p className={`capitalize pt-1 font-bold`}><span className="font-normal">Price:</span> {one.price}</p>
                    <p className={`capitalize pt-1 font-bold`}><span className="font-normal">Category:</span> {one.category?.name || "No category"}</p>
                </div>
            ))}
        </div>
        {!lastPage && <div className="flex justify-center">
        <button onClick={handleLoadMore}
         className="tomas-button my-10">Load More</button>
        </div>}
        </>
      )}
    </>
  );
};

export default Homepage;
