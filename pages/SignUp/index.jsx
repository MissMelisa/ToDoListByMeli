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
    <div className="text-center custom-container">
      <LogOut />
      <form className="custom-form" onSubmit={onSubmit}>
        <label for="signUpEmail" sm={4}>
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          name="email"
          id="signUpEmail"
          placeholder="Email"
        />

        <label for="signUpPassword" sm={4}>
          Password
        </label>

        <input
          type="password"
          name="passwordOne"
          value={passwordOne}
          onChange={(event) => setPasswordOne(event.target.value)}
          id="signUpPassword"
          placeholder="Password"
        />

        <label for="signUpPassword2" sm={4}>
          Confirm Password
        </label>

        <input
          type="password"
          name="password"
          value={passwordTwo}
          onChange={(event) => setPasswordTwo(event.target.value)}
          id="signUpPassword2"
          placeholder="Password"
        />

        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
