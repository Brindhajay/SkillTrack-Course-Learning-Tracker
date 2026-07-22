import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        fullName,
        email,
        password,
      });

      alert("Registration Successful ✅");

      navigate("/login");
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Registration Failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <div className="brand">
          <h1>📚 SkillTrack</h1>

          <h2>Create Your Account</h2>

          <p>
            Start your learning journey and track your progress with SkillTrack.
          </p>
        </div>
      </div>

      <div className="register-right">
        <div className="register-card">
          <h2>Create Account</h2>

          <p>Register to continue.</p>

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

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
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>

              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="register-btn" disabled={loading}>
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <div className="login-link">
            <span>Already have an account?</span>

            <button
              type="button"
              className="switch-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
