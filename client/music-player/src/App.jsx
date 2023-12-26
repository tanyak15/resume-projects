import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Dashboard, Home, Login, MusicPlayer } from "./components";
import { app } from "./config/firebase.config";
import { getAuth } from "firebase/auth";

import { AnimatePresence, motion } from "framer-motion";
import { validateUser } from "./api";
import { useStateValue } from "./contexts/StateProvider";
import { actionType } from "./contexts/reducer";

const App = () => {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();

  // state , dispatch fn
  const [{ user, isSongPlaying }, dispatch] = useStateValue();
  // console.log("INDEX :", isSongPlaying);

  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );

  // so that on refreshing the information does;nt gets lost
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        // 1. we have to extract that refrence token and 2. pass it to the backend and extract info from it
        userCred.getIdToken().then((token) => {
          // console.log("🤯🤯🤯" + token);
          validateUser(token).then((data) => {
            // console.log(data);
            dispatch({
              type: actionType.SET_USER,
              user: data,
            });
          });
        });
      } else {
        // 1. set auth state as false and reroute the user to login screen
        setAuth(false);
        dispatch({
          type: actionType.SET_USER,
          user: null,
        });
        window.localStorage.setItem("auth", "false");
        navigate("/login");
      }
    });
  }, []);

  return (
    <AnimatePresence wait>
      <div className="h-auto min-w -[680px] bg-violet-100 flex justify-center items-center">
        <Routes>
          <Route path="/login" element={<Login setAuth={setAuth} />}></Route>
          <Route path="/*" element={<Home />}></Route>
          <Route path="/dashboard/*" element={<Dashboard />}></Route>
        </Routes>
        {isSongPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className={`fixed min-w-[700px] h-26  inset-x-0 bottom-0  bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center`}
          >
            <MusicPlayer />
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};

export default App;
