import { useRouter } from "next/router";
import { sessionChange } from "../firebase/services/auth";
import { useState, useEffect } from "react";

export default function useUser() {
  const USER_STATES = {
    NOT_LOGGED: null,
    NOT_KNOWN: undefined,
    NOT_PROFILE: false,
    LOGGED: true,
  };

  const [user, setUser] = useState(USER_STATES.NOT_KNOWN);

  const router = useRouter();

  useEffect(() => {
    sessionChange(setUser);
  }, []);

  useEffect(() => {
    if (user === USER_STATES.NOT_PROFILE) {
      router.push("/");
    }
  }, [user]);

  return user;
}
