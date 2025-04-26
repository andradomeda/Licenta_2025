// src/Screens/Authentification/Auth.jsx
import { useState } from "react";
import { useGlobalContext } from "../../GlobalContext";
import NavBar from '../../Components/NavBar/NavBar';
import axios from "axios";

export default function Auth() {
    const { login } = useGlobalContext();
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
                alert("Cont creat cu succes!");
                setIsSignUp(false);
            } else {
                const res = await axios.post("http://localhost:3000/users/login", {
                    email: formData.email,
                    password: formData.password
                });
                login(); 
                alert("Autentificare reușită!");
            }
        } catch (error) {
            console.error(error);
            alert("Eroare la autentificare/înregistrare");
        }
    };

    return (
        <div>
            <NavBar />
            <div className="flex justify-center items-center min-h-screen bg-base-200">
                <div className="w-full max-w-sm p-6 bg-base-100 rounded-box shadow-md">
                    <h2 className="text-2xl font-bold text-center mb-4">
                        {isSignUp ? "Register" : "Login"}
                    </h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                        {isSignUp && (
                            <>
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
                                <input
                                    type="text"
                                    name="sending_ngo"
                                    placeholder="Sending NGO"
                                    className="input input-bordered w-full"
                                    value={formData.sending_ngo}
                                    onChange={handleChange}
                                    required
                                />
                            </>
                        )}

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
                            {isSignUp ? "Register" : "Login"}
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        {isSignUp ? "Ai deja cont?" : "Nu ai cont?"}{" "}
                        <button
                            type="button"
                            className="btn btn-sm btn-link text-primary"
                            onClick={() => setIsSignUp(!isSignUp)}
                        >
                            {isSignUp ? "Login" : "Register"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
