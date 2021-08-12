import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../authUserContext/authUserContext";

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
    <div className="min-w-screen min-h-screen px-5 py-5 relative h-100 w-full flex items-center justify-center font-sans bg-gradient-to-r from-green-200 to-green-500">
      <div className="	display: flex flex-col justify-center items-center">
        <p className=" flex items-center justify-center text-7xl text-gray-500 font-mono font-extrabold ">
          ToDo
        </p>

        <h2 className=" flex items-center justify-center text-3xl  text-gray-500 ">
          Login
        </h2>
        <form
          onSubmit={onSubmit}
          className="grid grid-flow-row auto-rows-max md:auto-rows-min justify-center items-center max-w-sm md:max-w-lg "
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
      </div>
    </div>
  );
}
