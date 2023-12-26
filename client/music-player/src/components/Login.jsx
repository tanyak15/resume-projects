import React, { useEffect } from "react";

import { app } from "../config/firebase.config";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

import { LoginBg } from "../assets/video";

const Login = ({ setAuth }) => {
  // firebase auth info
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  // this is because as user logged in we have to navivigate him to the home page
  const navigate = useNavigate();

  //we have to wait until login is called therefore async
  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");

        firebaseAuth.onAuthStateChanged((userCred) => {
          if (userCred) {
            userCred.getIdToken().then((token) => {
              console.log("😓😓😓" + token);
            });
            navigate("/", { replace: true });
          } else {
            setAuth(false);
            navigate("/login");
          }
        });
      }
    });
  };
  // if user is jst refreshing and it has been logged in then it will not redirect it to login page as it has already loged in
  useEffect(() => {
    if (window.localStorage.getItem("auth") === "true") {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <div className="relative w-screen h-screen">
      <video
        src={LoginBg}
        type="video/mp4"
        autoPlay
        muted
        loop
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-darkOverlay flex items-center justify-center p-4">
        <div className="w-full md:w-375 p-4 bg-lightOverlay shadow-2xl rounded-md  backdrop-blur-md flex flex-col items-center justify-center">
          <div
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all"
            onClick={loginWithGoogle}
          >
            <FcGoogle className="text-2xl" />
            Sign in with Google
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
