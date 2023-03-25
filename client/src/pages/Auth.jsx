import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [formData, setFormData] = useState({});
  const [isRegistered, setIsRegistered] = useState(true);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem(`user`));
  useEffect(() => {
    if (user) {
      navigate(`/`);
    }
  }, []);

  const handleInput = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.name) {
      toast.error("All fields are mandatory");
    } else {
      try {
        const response = await axios.post(
          `http://localhost:3001/api/users/register`,
          formData
        );

        if (response) {
          localStorage.setItem(`user`, JSON.stringify(response.data));
          navigate(`/`);
          location.reload();
        }
      } catch (error) {
        toast.error(error.response.data);
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("All fields are mandatory");
    } else {
      try {
        const response = await axios.post(
          `http://localhost:3001/api/users/login`,
          formData
        );

        if (response) {
          localStorage.setItem(`user`, JSON.stringify(response.data));
          navigate(`/`);
          location.reload();
        }
      } catch (error) {
        toast.error(error.response.data);
      }
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Login or Register</h1>
        <button
          style={{ textAlign: "center" }}
          onClick={() => {
            setIsRegistered(!isRegistered);
            setFormData({});
            document.querySelector(".form").reset();
          }}
        >
          {isRegistered ? "Register Here" : "Log In Here"}
        </button>
      </div>
      <br />
      <div className="loginForm">
        <form className="form card">
          {isRegistered ? (
            <>
              <div className="card_header">
                <h1 className="form_heading">Log in</h1>
              </div>
              <div className="field">
                <label>Email</label>
                <input
                  className="input"
                  name="email"
                  placeholder="Email"
                  onChange={handleInput}
                  type="email"
                />
              </div>
              <div className="field">
                <label>Password</label>
                <input
                  className="input"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleInput}
                />
              </div>
              <div className="field">
                <button className="formButton" onClick={handleLogin}>
                  Login
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="card_header">
                <h1 className="form_heading">Register</h1>
              </div>
              <div className="field">
                <label>Name</label>
                <input
                  className="input"
                  name="name"
                  type="text"
                  placeholder="name"
                  onChange={handleInput}
                />
              </div>
              <div className="field">
                <label>Email</label>
                <input
                  className="input"
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleInput}
                />
              </div>
              <div className="field">
                <label>Password</label>
                <input
                  className="input"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleInput}
                />
              </div>
              <div className="field">
                <button className="formButton" onClick={handleRegister}>
                  Register
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default Auth;
