import { useRouter } from "next/router";
import SignUp from "../SignUp";

const LoggedIn = () => {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authUser) router.push("/");
  }, [authUser, loading]);

  return <SignUp />;
};
export default LoggedIn;
