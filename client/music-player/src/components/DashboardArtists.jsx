import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { useStateValue } from "../contexts/StateProvider";
import { Link } from "react-router-dom";
import { IoLogoInstagram, IoLogoTwitter } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { getAllArtist } from "../api/index";
import { actionType } from "../contexts/reducer";
import SongCard from "./SongCard";

const DashboardArtists = () => {
  const [{ allArtists }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allArtists) {
      getAllArtist().then((data) => {
        // console.log()
        dispatch({ type: actionType.SET_ALL_ARTISTS, allArtists: data });
      });
    }
  }, []);

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="relative w-full gap-3  my-4 p-4 py-12 border border-gray-300 rounded-md flex flex-wrap justify-evenly">
        {/* {allArtists &&
          allArtists.map((data, index) => {
            return <>{<ArtistContainer data={allArtists} />}</>;
          })} */}
        <ArtistContainer data={allArtists} />
      </div>
    </div>
  );
};

export const ArtistContainer = ({ data }) => {
  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
      {data &&
        data.map((song, i) => (
          <SongCard key={song._id} data={song} index={i} type="artist" />
        ))}
    </div>
  );
};
export default DashboardArtists;
