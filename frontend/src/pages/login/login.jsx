import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      // const response = await loginUser({
      //     email,
      //     password
      // });

      // localStorage.setItem("token", response.token);
      // localStorage.setItem("user", JSON.stringify(response));

      const response = await loginUser({
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", response);

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response));

      alert("Login Successful ✅");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="brand">
          <h1>📚 SkillTrack</h1>

          <h2>Learn Smarter.</h2>

          <p>
            Track your learning journey, monitor progress, and achieve your
            goals.
          </p>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <h2>Welcome Back 👋</h2>

          <p>Login to continue learning.</p>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="register-link">
            <span>Don't have an account?</span>

            <button
              type="button"
              className="switch-btn"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
