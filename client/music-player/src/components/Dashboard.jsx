import React, { useEffect } from "react";
import Header from "./Header";
import { NavLink, Route, Routes } from "react-router-dom";

import { IoHome } from "react-icons/io5";
import { isActiveStyles, isNoActiveStyles } from "../utils/styles.jsx";
import DashboardHome from "./DashboardHome";
import DashboardAlbums from "./DashboardAlbums";
import DashboardArtists from "./DashboardArtists";
import DashboardSongs from "./DashboardSongs";
import DashboardUsers from "./DashboardUsers";
import DashboardNewSong from "./DashboardNewSong";
import Alert from "./Alert";
import {
  getAllAlbums,
  getAllArtist,
  getAllSongs,
  getAllUsers,
} from "../api/index";
import { useStateValue } from "../contexts/StateProvider";
import { actionType } from "../contexts/reducer";

const Dashboard = () => {
  const [{ alertType, allAlbums, allArtists, allUsers, allSongs }, dispatch] =
    useStateValue();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USER,
          allUsers: data.data,
        });
      });
    }

    if (!allSongs) {
      getAllSongs().then((data) => {
        // console.log("Dashboard home :GET ALL SONGS", data);
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
      });
    }

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

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header />
      <div className="w-[60%] my-2 p-4 flex items-center justify-evenly">
        <NavLink to={"/dashboard/Home"}>
          <IoHome className="text-2xl text-textColor" />
        </NavLink>
        <NavLink
          to={"/dashboard/user"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNoActiveStyles
          }
        >
          Users
        </NavLink>
        <NavLink
          to={"/dashboard/songs"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNoActiveStyles
          }
        >
          Songs
        </NavLink>
        <NavLink
          to={"/dashboard/artist"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNoActiveStyles
          }
        >
          Artists
        </NavLink>
        <NavLink
          to={"/dashboard/albums"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNoActiveStyles
          }
        >
          Albums
        </NavLink>
      </div>

      <div className="my-4 w-full p-4">
        <Routes>
          <Route path="/home" element={<DashboardHome />} />
          <Route path="/user" element={<DashboardUsers />} />
          <Route path="/songs" element={<DashboardSongs />} />
          <Route path="/artist" element={<DashboardArtists />} />
          <Route path="/albums" element={<DashboardAlbums />} />
          <Route path="/newSong" element={<DashboardNewSong />} />
        </Routes>
      </div>
      {alertType && <Alert type={alertType} />}
    </div>
  );
};

export default Dashboard;
