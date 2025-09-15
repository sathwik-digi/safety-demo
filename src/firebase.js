// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getRemoteConfig, fetchAndActivate, getValue } from "firebase/remote-config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTARB8sOBeUAB4etVOnLshBdm16XRRDxU",
  authDomain: "safetymanagement-d43f8.firebaseapp.com",
  databaseURL: "https://safetymanagement-d43f8-default-rtdb.firebaseio.com",
  projectId: "safetymanagement-d43f8",
  storageBucket: "safetymanagement-d43f8.firebasestorage.app",
  messagingSenderId: "140404486162",
  appId: "1:140404486162:web:467e5ede8d5872c838e8cb",
  measurementId: "G-430220FXEZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const remoteConfig = getRemoteConfig(app);
remoteConfig.settings = {
    minimumFetchIntervalMillis: 10000, // 1 hour
  };
  export const getRemoteConfigValue = async (key) => {
    try {
      await fetchAndActivate(remoteConfig);
      return getValue(remoteConfig, key)._value || null;
    } catch (error) {
      console.error("Remote Config error:", error);
      return null;
    }
  };

export { remoteConfig };