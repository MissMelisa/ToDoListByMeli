import LogoTodo from "../Components/LogoTodo";
import { AuthUserProvider } from "./authUserContext/authUserContext";
import "./styles.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <div className="min-w-screen min-h-screen px-5 py-5 relative h-100 w-full flex items-center justify-center font-sans bg-gradient-to-r from-green-200 to-green-500 flex-col">
        <LogoTodo />
        <Component {...pageProps} />
      </div>
    </AuthUserProvider>
  );
}

export default MyApp;
