import { useRouter } from "next/router";

import { createContext, useContext, useEffect } from "react";
import useFirebaseAuth from "../../Hooks/useFirebaseAuth/useFirebaseAuth";

const authUserContext = createContext({
  authUser: null,
  loading: true,
  signInWithEmailAndPassword: async () => {},
  createUserWithEmailAndPassword: async () => {},
  signOut: async () => {},
});

const PUBLIC_ROUTES = ["/SignUp", "/LogIn"];

export default function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();
  const router = useRouter();

  useEffect(() => {
    if (
      !auth.loading &&
      !auth.authUser &&
      !PUBLIC_ROUTES.includes(router.route)
    )
      router.push("/LogIn");
  }, [auth.authUser, auth.loading]);

  return (
    <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
  );
}

export const useAuth = () => useContext(authUserContext);
