import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../authUserContext/authUserContext";
import { users } from "../../firebase";

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
        .then(({ user }) => {
          const thisUser = users.child(user.uid);
          const userDetail = thisUser.child("userDetail");
          const dataToInsert = { email: user.email, userId: user.uid };
          userDetail.set(dataToInsert);

          router.push("/LogIn");
        })
        .catch((error) => {
          setError(error.message);
        });
    else setError("Password do not match");
    event.preventDefault();
  };

  return (
    <form
      className="display:flex flex-col md:auto-rows-min justify-center items-center max-w-sm md:max-w-lg "
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
  );
};

export default SignUp;
