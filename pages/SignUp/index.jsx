import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../authUserContext/authUserContext";
import LogOut from "../../Components/SingOut";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const router = useRouter();
  const [error, setError] = useState(null);

  const { createUserWithEmailAndPassword } = useAuth();

  const onSubmit = (event) => {
    setError(null);

    if (passwordOne === passwordTwo)
      createUserWithEmailAndPassword(email, passwordOne)
        .then((authUser) => {
          console.log("Success. The user is created in Firebase");
          router.push("/LogIn");
        })
        .catch((error) => {
          setError(error.message);
        });
    else setError("Password do not match");
    event.preventDefault();
  };

  return (
    <div className="min-w-screen min-h-screen px-5 py-5 relative h-100 w-full items-center justify-center font-sans relative h-100 w-full flex items-center justify-center font-sans bg-gradient-to-r from-green-200 to-green-500">
      <div className="	display: flex flex-col justify-center items-center">
        <p className=" flex items-center justify-center text-7xl text-gray-500 font-mono font-extrabold ">
          ToDo
        </p>

        <img
          className="object-scale-down h-10   "
          src="https://media.istockphoto.com/vectors/green-grunge-check-ma rk-correct-answer-checking-vote-or-choice-icon-vector-id1051035264?b=1&k=6&m=1051035264&s=170667a&w=0&h=-_yVmpjBVAhsd01X9RBuTAlscyKCJoNN1vfMDo1jzpw="
        />
        <form
          className="grid grid-flow-row auto-rows-max md:auto-rows-min justify-center items-center max-w-sm md:max-w-lg "
          onSubmit={onSubmit}
        >
          <label
            for="signUpEmail"
            className=" w-full font-sans antialiased text-xl font-medium sm:subpixel-antialiased md:antialiased mt-8 md:my-8"
          >
            Email
          </label>

          <input
            className=" shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker focus:bg-white "
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            name="email"
            id="signUpEmail"
            placeholder="Email"
          />

          <label
            for="signUpPassword"
            className=" w-full font-sans antialiased text-xl font-medium sm:subpixel-antialiased md:antialiased mt-8 md:my-8"
          >
            Password
          </label>

          <input
            type="password"
            name="passwordOne"
            value={passwordOne}
            onChange={(event) => setPasswordOne(event.target.value)}
            id="signUpPassword"
            className=" shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker focus:bg-white "
            placeholder="Password"
          />

          <label
            for="signUpPassword2"
            className=" w-full font-sans antialiased text-xl font-medium sm:subpixel-antialiased md:antialiased mt-8 md:my-8"
          >
            Confirm Password
          </label>

          <input
            type="password"
            name="password"
            value={passwordTwo}
            onChange={(event) => setPasswordTwo(event.target.value)}
            id="signUpPassword2"
            className=" shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker focus:bg-white "
            placeholder="Password"
          />

          <button className=" self-center bg-green-600 hover:bg-teal-dark  text-white font-bold py-2 px-2 rounded  shadow m-5 ">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
