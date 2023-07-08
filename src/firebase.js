import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getStorage, ref} from "firebase/storage";
import {doc, getFirestore} from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDDoK1booCZ4OxDkx-BorJOl20ZkmWIsh0",
	authDomain: "eido-tuts.firebaseapp.com",
	projectId: "eido-tuts",
	storageBucket: "eido-tuts.appspot.com",
	messagingSenderId: "668898920666",
	appId: "1:668898920666:web:72ec79ba7af7934048fde3",
	measurementId: "G-X1V177P1DT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

const userDoc = userId => doc(db, "user", userId);
const listRef = ref(storage, 'out');

export {auth, storage, userDoc, listRef}
