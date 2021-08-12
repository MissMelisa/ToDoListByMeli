import { useRouter } from "next/router";
import { useAuth } from "../../pages/authUserContext/authUserContext";

const LogOut = () => {
  const { authUser, loading, signOut } = useAuth();
  const router = useRouter();

  return (
    <div>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
};

export default LogOut;
