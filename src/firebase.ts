import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth/cordova";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

console.log('Firebase Config:', firebaseConfig);



const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup  = async (name : string, email : string, password : string) => {
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid : user.uid,
            name,
            authProvider : "local",
            email
        })
    }catch(error){
        if(typeof error === "object" && error !== null && "code" in error){
            console.log(error);
            toast.error((error as any).code.split('/')[1].split('-').join(' '))
        }
    }
}

const login = async (email : string, password : string) => {
    try{
        await signInWithEmailAndPassword(auth,email,password);
    }catch(error){
        if(typeof error === "object" && error !== null && "code" in error){
            console.log(error);
            toast.error((error as any).code.split('/')[1].split('-').join(' '))
        }
    }
}

const logout = () => {
    try{
        signOut(auth);
    }catch(error){
        if(typeof error === "object" && error !== null && "code" in error){
            console.log(error);
            toast.error((error as any).code.split('/')[1].split('-').join(' '))
        }
    }
}

export { auth, db, login, signup, logout }