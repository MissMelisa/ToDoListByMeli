import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../authUserContext/authUserContext";
import LogoTodo from "../../Components/LogoTodo";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { signInWithEmailAndPassword } = useAuth();

  const onSubmit = (event) => {
    setError(null);
    signInWithEmailAndPassword(email, password)
      .then(() => {
        router.push("/TodoPage");
      })
      .catch((error) => {
        setError(error.message);
      });
    event.preventDefault();
  };

  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-flow-row auto-rows-max items-center justify-center md:auto-rows-min max-w-sm md:max-w-lg  items-center justify-center"
    >
      <label
        for="loginEmail"
        className=" w-full font-sans antialiased text-xl font-medium sm:subpixel-antialiased md:antialiased mt-8 md:my-8"
      >
        Email
      </label>

      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        name="email"
        id="loginEmail"
        placeholder="Email"
        className=" shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker focus:bg-white "
      />

      <label
        for="loginPassword"
        className=" w-full font-sans antialiased text-xl font-medium sm:subpixel-antialiased md:antialiased mt-8 md:my-8"
      >
        Password
      </label>
      <div sm={8}>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          id="loginPassword"
          placeholder="Password"
          className=" shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker focus:bg-white "
        />
      </div>

      <button className="bg-green-600 hover:bg-teal-dark  text-white font-bold py-2 px-2 rounded  shadow m-2">
        Login
      </button>

      <div>
        No account? <a href="/SignUp">Create one</a>
      </div>
    </form>
  );
}
