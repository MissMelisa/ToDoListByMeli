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
    <div className="min-w-screen min-h-screen px-5 py-5 relative h-100 w-full flex items-center justify-center font-sans bg-blue-500 md:bg-green-500">
      <div>
        <h2>Login</h2>
      </div>

      <div style={{ maxWidth: "400px", margin: "auto" }}>
        <div>
          <form onSubmit={onSubmit}>
            <label for="loginEmail" sm={4}>
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              name="email"
              id="loginEmail"
              placeholder="Email"
            />

            <label for="loginPassword" sm={4}>
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
              />
            </div>

            <div>
              <button>Login</button>
            </div>

            <div>
              No account? <a href="/SignUp">Create one</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
