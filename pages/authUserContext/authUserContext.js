import { useRouter } from "next/router";
import { createContext, useContext, useEffect } from "react";
import useFirebaseAuth from "../../Hooks/useFirebaseAuthh/useFirebaseAuth";

const authUserContext = createContext({
  authUser: null,
  loading: true,
  signInWithEmailAndPassword: async () => {},
  createUserWithEmailAndPassword: async () => {},
  signOut: async () => {},
});

export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();
  const router = useRouter();
  console.log(router);
  useEffect(() => {
    if (!auth.loading && !auth.authUser && router.route !== "/SignUp")
      router.push("/LogIn");
  }, [auth.authUser, auth.loading]);

  return (
    <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
  );
}

export const useAuth = () => useContext(authUserContext);
