// src/Screens/Authentification/Auth.jsx
import { useState } from "react";
import { useGlobalContext } from "../../GlobalContext";
import { useNavigate } from "react-router-dom";
import Navbar from '../../Components/NavBar/NavBar';
import img5_oriz from '../../assets/img5_oriz.jpg'
import axios from "axios";

export default function Auth() {
    const { login } = useGlobalContext();
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone_number: "",
        city: "",
        county: "",
        sending_ngo: ""
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isSignUp) {
                await axios.post("http://localhost:3000/users/register", {
                    type: "simple",
                    ...formData
                });
                setIsSignUp(false);
            } else {
                const res = await axios.post("http://localhost:3000/users/login", {
                    email: formData.email,
                    password: formData.password
                });
                login(res.data.accessToken);
                navigate("/profile");
            }
        } catch (error) {
            console.error(error);
            alert(`Eroare la înregistrare: ${error.message}`);
        }
    };
    return (
        <div>
          <img src={img5_oriz} alt="background" className="background" />
         <Navbar />
          <div className="flex justify-center items-start min-h-screen pt-24">
            <div
              className={`w-full ${isSignUp ? "max-w-4xl p-10" : "max-w-sm p-6"} bg-white/80 rounded-box shadow-md`}
            >
              <h2 className="text-2xl font-bold text-center mb-6">
                {isSignUp ? "Register" : "Login"}
              </h2>
      
              <form
                onSubmit={handleSubmit}
                className={`${isSignUp ? "grid grid-cols-2 gap-6" : "flex flex-col gap-4"}`}
              >
                {isSignUp ? (
                  <>
                    <div className="flex flex-col gap-4">
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="input input-bordered w-full"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      <input
                        type="text"
                        name="phone_number"
                        placeholder="Phone Number"
                        className="input input-bordered w-full"
                        value={formData.phone_number}
                        onChange={handleChange}
                        required
                      />
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        className="input input-bordered w-full"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                      <input
                        type="text"
                        name="county"
                        placeholder="County"
                        className="input input-bordered w-full"
                        value={formData.county}
                        onChange={handleChange}
                        required
                      />
                    </div>
      
                    <div className="flex flex-col gap-4">
                      <input
                        type="text"
                        name="sending_ngo"
                        placeholder="Sending NGO"
                        className="input input-bordered w-full"
                        value={formData.sending_ngo}
                        onChange={handleChange}
                        required
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="input input-bordered w-full"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="input input-bordered w-full"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <button type="submit" className="btn btn-neutral w-full">
                        Register
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="input input-bordered w-full"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="input input-bordered w-full"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button type="submit" className="btn btn-neutral w-full">
                      Login
                    </button>
                  </>
                )}
              </form>
      
              <div className="text-center mt-6">
                {isSignUp ? "Ai deja cont?" : "Nu ai cont?"}{" "}
                <button
                  type="button"
                  className="btn btn-sm btn-link text-primary"
                  onClick={() => setIsSignUp(!isSignUp)}
                >
                  {isSignUp ? "Login" : "Fă-ți cont"}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
      
}
