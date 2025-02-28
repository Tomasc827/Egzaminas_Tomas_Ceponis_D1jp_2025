import { Dispatch, FormEvent, SetStateAction } from "react";
import { useDataContext } from "./contexts/DataContext";
import SearchIcon from "./svgs/SearchIcon";
import SearchIconMobile from "./svgs/SearchIconMobile";

interface propsHomepage {
  direction: string;
  sortBy: string;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  setDirection: Dispatch<SetStateAction<string>>;
  setSortBy: Dispatch<SetStateAction<string>>;
  setPage: Dispatch<SetStateAction<number>>;
  setSize: Dispatch<SetStateAction<number>>;
  getAllEntity: () => void;
}

const SearchBar = ({
  setDirection,
  setSortBy,
  direction,
  sortBy,
  name,
  setName,
  setPage,
  setSize,
  getAllEntity
}: propsHomepage) => {

    const {windowSize:{width}} = useDataContext();

  const handleDirection = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDirection(e.target.value);
  };
  const handleSortBy = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortBy(e.target.value);
  }

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSearch = (e:React.FormEvent) => {
    e.preventDefault();
    setPage(0);
    setSize(8);
    getAllEntity();
  }

  const { isDarkMode } = useDataContext();

  return (
    <>
      <form
      onSubmit={handleSearch}
        className={`w-[80%] tablet:mx-[10%%] phone:mx-[10%] fixed z-[21] top-[10%] duration-500 bg-white rounded-xl py-2 ${
          !isDarkMode
            ? "border-4 border-purple-300"
            : "border-4 border-transparent"
        }`}
      >
        <div className="grid grid-cols-3 relative font-bold ">
          <SearchIcon />
          <input
            onChange={handleName}
            value={name}
            placeholder="Filter by name..."
            className={`w-[70%] phone:ms-10 tablet:ms-13 desktop:ms-20 py-1 ps-2 placeholder:font-normal rounded-2xl focus:shadow-inner focus:shadow-purple-600 border-b-2 border-transparent duration-500 focus:border-purple-600 ${
              isDarkMode ? "text-blue-500" : "text-navy-color"
            }`}
          ></input>
          <select
          onChange={handleDirection}
          value={direction}
            defaultValue=""
            className={`w-[100%] tomas-select cursor-pointer duration-500 text-[#5964e0]`}
          >
            <option
              className={`text-center  ${
                isDarkMode && "bg-gray-900 text-white"
              }`}
              disabled
              value=""
            >
              Direction
            </option>
            <option
              value="asc"
              className={`text-center font-semibold ${
                isDarkMode && "bg-gray-500 text-white"
              }`}
            >
              Ascending
            </option>
            <option
              value="desc"
              className={`text-center font-semibold ${
                isDarkMode && "bg-gray-500 text-white"
              }`}
            >
              Descending
            </option>
          </select>
          <select
          onChange={handleSortBy}
          value={sortBy}
            defaultValue=""
            className={`phone:w-[60%] tablet:w-[50%] desktop:w-[70%] tomas-select cursor-pointer duration-500 text-[#5964e0]`}
          >
            <option
              className={`text-center  ${
                isDarkMode && "bg-gray-900 text-white"
              }`}
              disabled
              value=""
            >
              Sort By
            </option>
            <option
              value="name"
              className={`text-center font-semibold ${
                isDarkMode && "bg-gray-500 text-white"
              }`}
            >
              Name
            </option>
            <option
              value="createdAt"
              className={`text-center font-semibold ${
                isDarkMode && "bg-gray-500 text-white"
              }`}
            >
              Date
            </option>
          </select>
          {width >= 1000 ? (
              <button
                type="submit"
                className={`tomas-button py-[10px] absolute top-[-15%] right-[1rem] ${
                  width <= 1000 ? "min-w-[3rem] p-2 ms-1" : ""
                }`}
              >
                Search
              </button>
          ) : (
              <button
                type="submit"
                className={`tomas-button py-[10px] absolute top-[-22%] right-[1rem] min-w-[3rem] p-2`}
              >
                <SearchIconMobile />
              </button>
          )}
        </div>
      </form>
    </>
  );
};

export default SearchBar;
