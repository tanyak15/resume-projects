import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoTrash } from "react-icons/io5";
import { useStateValue } from "../contexts/StateProvider";
import { actionType } from "../contexts/reducer";
import {
  deleteAlbumById,
  deleteArtistById,
  deleteSongById,
  getAllAlbums,
  getAllArtist,
  getAllSongs,
} from "../api";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../config/firebase.config";

const SongCard = ({ data, index, type }) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const [
    { alertType, allSongs, allArtists, allAlbums, songIndex, isSongPlaying },
    dispatch,
  ] = useStateValue();

  const deleteObjectDetails = (data) => {
    // !we need to find out which category is it -- song , album , artist

    // todo -- FOR DELTING SONGS
    if (type === "song") {
      const deleteRef = ref(storage, data.imageURL);
      deleteObject(deleteRef).then(() => {});

      deleteSongById(data._id).then((res) => {
        if (res.data) {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: "success",
          });
          setInterval(() => {
            dispatch({
              type: actionType.SET_ALERT_TYPE,
              alertType: null,
            });
          }, 4000);
          getAllSongs().then((data) => {
            dispatch({
              type: actionType.SET_ALL_SONGS,
              allSongs: data.data,
            });
          });
        } else {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: "danger",
          });
          setInterval(() => {
            dispatch({
              type: actionType.SET_ALERT_TYPE,
              alertType: null,
            });
          }, 4000);
        }
      });
    }

    // todo -- FOR DELTING ARTIST
    if (type === "artist") {
      const deleteRef = ref(storage, data.imageURL);

      deleteObject(deleteRef).then(() => {});

      deleteArtistById(data._id).then((res) => {
        if (res.data) {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: "success",
          });
          setInterval(() => {
            dispatch({
              type: actionType.SET_ALERT_TYPE,
              alertType: null,
            });
          }, 4000);
          getAllArtist().then((data) => {
            dispatch({
              type: actionType.SET_ALL_ARTISTS,
              allArtists: data,
            });
          });
        } else {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: "danger",
          });
          setInterval(() => {
            dispatch({
              type: actionType.SET_ALERT_TYPE,
              alertType: null,
            });
          }, 4000);
        }
      });
    }

    // todo -- FOR DELTING ALBUMS
    if (type === "album") {
      const deleteRef = ref(storage, data.imageURL);
      deleteObject(deleteRef).then(() => {});

      deleteAlbumById(data._id).then((res) => {
        if (res.data) {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: "success",
          });
          setInterval(() => {
            dispatch({
              type: actionType.SET_ALERT_TYPE,
              alertType: null,
            });
          }, 4000);

          getAllAlbums().then((data) => {
            dispatch({
              type: actionType.SET_ALL_ALBUMS,
              allAlbums: data,
            });
          });
        } else {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: "danger",
          });
          setInterval(() => {
            dispatch({
              type: actionType.SET_ALERT_TYPE,
              alertType: null,
            });
          }, 4000);
        }
      });
    }
  };

  const addSongToContext = () => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_IS_SONG_PLAYING,
        isSongPlaying: true,
      });
      console.log("CHECKING", isSongPlaying);
    }

    if (songIndex !== index) {
      // console.log(index);
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: index,
      });
    }
  };

  return (
    <motion.div
      // whileTap={{ scale: 0.8 }}
      initial={{ opacity: 0, translateX: -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="relative w-40 min-w-210 px-2  py-4 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
      onClick={addSongToContext}
    >
      <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={data.imageURL}
          alt=""
          className=" w-full h-full rounded-lg object-cover"
        />
      </div>

      <p className="text-base text-center text-headingColor font-semibold my-2">
        {data?.name?.length > 25 ? `${data.name.slice(0, 25)}..` : data.name}
        {data.artist && (
          <span className="block text-sm text-gray-400 my-1">
            {data?.artist?.length > 25
              ? `${data.artist.slice(0, 25)}..`
              : data.artist}
          </span>
        )}
      </p>
      <div className="w-full absolute bottom-2 right-2 flex items-center justify-between px-4">
        <motion.i
          whileTap={{ scale: 0.75 }}
          className="text-base text-red-400 drop-shadow-md hover:text-red-600"
          onClick={() => setIsDeleted(true)}
        >
          <IoTrash />
        </motion.i>
      </div>

      {isDeleted && (
        <motion.div
          className="absolute inset-0 backdrop-blur-sm flex flex-col items-center justify-center px-5 py-2 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-lg text-loaderOverlaytextGray font-semibold text-center">
            Are you sure do you want to delete it?
          </p>
          <div className="flex items-center gap-4">
            <motion.button
              className="px-3 py-1 text-sm uppercase bg-green-400 rounded-md hover:bg-green-600 cursor-pointer"
              whileTap={{ scale: 0.7 }}
              onClick={() => deleteObjectDetails(data)}
            >
              Yes
            </motion.button>
            <motion.button
              className="px-2 py-1 text-sm uppercase bg-red-400 rounded-md hover:bg-red-600 cursor-pointer"
              whileTap={{ scale: 0.7 }}
              onClick={() => setIsDeleted(false)}
            >
              No
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SongCard;
