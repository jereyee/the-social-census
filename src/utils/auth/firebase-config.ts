import { getAuth } from "@firebase/auth";
import { signOut } from "firebase/auth";
import { baseURL } from "utils/api/functions";

export const firebaseConfig = {
  apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_KEY ?? ""}`,
  authDomain: "social-census-sg.firebaseapp.com",
  projectId: "social-census-sg",
  storageBucket: "social-census-sg.appspot.com",
  messagingSenderId: "775883539332",
  appId: `${process.env.NEXT_PUBLIC_FIREBASE_ID ?? ""}`,
  measurementId: "G-PKMELYDJ6Z",
};

export const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: `https://social-census.com/login`,
  // This must be true.
  handleCodeInApp: true,
  /* 
  iOS: {
    bundleId: 'com.example.ios'
  },
  android: {
    packageName: 'com.example.android',
    installApp: true,
    minimumVersion: '12'
  },
  dynamicLinkDomain: 'example.page.link' */
};

export const signOutUser = () => {
  // Initialize Firebase
  const auth = getAuth();

  signOut(auth)
    .then(() => {
      // Sign-out successful.
      window.localStorage.setItem("auth", "false");
      // setIsAuth(false);
    })
    .catch((error) => {
      console.log(error);
    });
};
