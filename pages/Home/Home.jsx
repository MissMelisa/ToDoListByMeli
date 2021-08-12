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
        router.push("/logged_in");
      })
      .catch((error) => {
        setError(error.message);
      });
    event.preventDefault();
  };

  return (
    <div className="text-center" style={{ padding: "40px 0px" }}>
      <div>
        <h2>Login</h2>
      </div>

      <div style={{ maxWidth: "400px", margin: "auto" }}>
        <div>
          <form onSubmit={onSubmit}>
            <form div>
              <label for="loginEmail" sm={4}>
                Email
              </label>
              <div sm={8}>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  name="email"
                  id="loginEmail"
                  placeholder="Email"
                />
              </div>
            </form>
            <form div>
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
            </form>
            <form div>
              <div>
                <Button>Login</Button>
              </div>
            </form>
            <form div>
              <Col>
                No account? <Link href="/sign_up">Create one</Link>
              </Col>
            </form>
          </form>
        </div>
      </div>
    </div>
  );
}
