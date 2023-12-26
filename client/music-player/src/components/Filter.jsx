import React, { useEffect } from "react";
import { actionType } from "../contexts/reducer";
import { useStateValue } from "../contexts/StateProvider";
import { getAllAlbums, getAllArtist, getAllSongs } from "../api/index";
import { filterByLanguage, filters } from "../utils/supportfunctions";
import FilterButtonGit from "./FilterButtonGit";
import { MdClearAll } from "react-icons/md";
import { motion } from "framer-motion";

const Filter = ({ setFilteredSongs }) => {
  const [{ filterTerm, allArtists, allAlbums }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allArtists) {
      getAllArtist().then((data) => {
        dispatch({ type: actionType.SET_ALL_ARTISTS, allArtists: data });
      });
    }

    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({ type: actionType.SET_ALL_ALBUMS, allAlbums: data });
      });
    }
  }, []);

  const updateFilter = (value) => {
    dispatch({
      type: actionType.SET_FILTER_TERM,
      filterTerm: value,
    });
  };

  const clearAllFilter = () => {
    dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: null });
    dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: null });
    dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: null });
    dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: null });

    setFilteredSongs(null);
    // if (!allSongs) {
    //   getAllSongs().then((data) => {
    //     console.log("Dashboard home :GET ALL SONGS", data);
    //     dispatch({
    //       type: actionType.SET_ALL_SONGS,
    //       allSongs: data.data,
    //     });
    //   });
    // }
  };
  return (
    <div className="w-full my-4 px-6 py-4 flex items-center justify-start md:justify-center gap-10">
      <FilterButtonGit filterData={allArtists} flag={"Artist"} />

      <div className=" flex items-center gap-6 mx-4">
        {filters?.map((data) => (
          <p
            key={data.id}
            onClick={() => updateFilter(data.value)}
            className={`text-base ${
              data.value === filterTerm ? "font-semibold" : "font-normal"
            } text-textColor cursor-pointer hover:font-semibold transition-all duration-100 ease-in-out`}
          >
            {data.name}
          </p>
        ))}
      </div>

      <FilterButtonGit filterData={allAlbums} flag={"Albums"} />

      <FilterButtonGit filterData={filterByLanguage} flag={"Language"} />

      <motion.i
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileTap={{ scale: 0.75 }}
        onClick={clearAllFilter}
      >
        <MdClearAll className="text-textColor text-xl cursor-pointer" />
      </motion.i>
    </div>
  );
};

export default Filter;
