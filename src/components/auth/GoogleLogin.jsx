import React from 'react'
import { userExists, closeAuthModal } from "../../redux/reducers/auth.js";
import {  toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {server} from "../../constants/constant.js"
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase.js";
const GoogleLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();     
    const { redirectPath } = useSelector(
        (state) => state.auth
    );
    const handleGoogleLogin = async () => {
        try {

            // Firebase Popup
            const result = await signInWithPopup(
                auth,
                googleProvider
            );

            const firebaseUser = result.user;

            // Send data to backend
            const { data } = await axios.post(
                `${server}user/google-login`,
                {
                    firebase_uid: firebaseUser.uid,
                    full_name:
                        firebaseUser.displayName,
                    email:
                        firebaseUser.email,
                    profile_photo:
                        firebaseUser.photoURL,
                },
                {
                    withCredentials: true,
                }
            );

            // Redux Login
            dispatch(
                userExists(data.user)
            );

            // Close Auth Modal
            dispatch(
                closeAuthModal()
            );

            toast.success(
                "Welcome to JoinTrip 🎉"
            );

            // Redirect
            navigate(
                redirectPath || "/"
            );

        } catch (error) {

            console.log(
                "Google Login Error:",
                error
            );

            toast.error(
                error?.response?.data?.message ||
                "Google Login Failed"
            );

        }
    };
  return (
    <div>
          {/* DIVIDER */}
          <div className="flex items-center my-2">
              <div className="flex-1 border-t"></div>
              <span className="px-4 text-gray-500 text-sm">
                  OR
              </span>
              <div className="flex-1 border-t"></div> </div>
          {/* GOOGLE LOGIN */}
          <button
              type="button"
              onClick={handleGoogleLogin}
              className=" w-full flex items-center 
                   justify-center gap-3 border
                    border-gray-200 py-2 rounded-xl
                     hover:bg-pink-50
                      hover:border-pink-300 transition " >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google"
                  className="w-5 h-5" />
              Continue with Google
          </button>
    </div>
  )
}

export default GoogleLogin
