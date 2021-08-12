import { AuthUserProvider } from "./authUserContext/authUserContext";
import "./styles.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <Component {...pageProps} />
    </AuthUserProvider>
  );
}

export default MyApp;
