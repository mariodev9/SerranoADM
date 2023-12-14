import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../config";

export const Login = (data, setError) => {
  const { email, password } = data;
  if ((email, password)) {
    signInWithEmailAndPassword(auth, email, password)
      .then(setError(false))
      .catch((error) => {
        setError(true);
      });

    setTimeout(() => {
      setError(false);
    }, 2000);
  }
};

export const sessionChange = (setIsLogin) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  });
};

export const logOut = () => {
  signOut(auth)
    .then(() => {})
    .catch((error) => {
      // An error happened.
    });
};
