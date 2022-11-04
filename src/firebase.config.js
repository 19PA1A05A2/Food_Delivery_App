import {getApp,getApps,initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC3VTHyolVcb-lCwAGw_PLJVY1_5DZ7pqg",
    authDomain: "fooddeliveryapp-1a4d7.firebaseapp.com",
    databaseURL: "https://fooddeliveryapp-1a4d7-default-rtdb.firebaseio.com",
    projectId: "fooddeliveryapp-1a4d7",
    storageBucket: "fooddeliveryapp-1a4d7.appspot.com",
    messagingSenderId: "154162837498",
    appId: "1:154162837498:web:ed84d529bf9b3be4ab5643"
  };
const app=getApps.length>0 ?  getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage=getStorage(app);

export {app,firestore,storage};