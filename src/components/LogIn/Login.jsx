
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, User } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { auth, signInWithEmailAndPassword, signInWithPopup, googleProvider } from "../../firebase";
import Swal from "sweetalert2";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire("Success!", "Logged in successfully!", "success");
      navigate("/dashboard");
    } catch (error) {
      Swal.fire("Error!", error.message, "error");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      Swal.fire("Success!", "Logged in with Google!", "success");
      navigate("/dashboard");
    } catch (error) {
      Swal.fire("Error!", error.message, "error");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="group flex w-[50%] h-[80%] rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:border-green-500 hover:shadow-2xl transform hover:scale-105 transition-all duration-300" style={{ boxShadow: "10px 0px 10px #97e297" }}>
        <div className="w-[45%] bg-cover bg-center" style={{ backgroundImage: 'url("/img/image.png")' }} />
        <div className="w-[55%] bg-white flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type="email" placeholder="Email" className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type="password" placeholder="Password" className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type="button" className="w-full flex items-center justify-center py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition-colors" onClick={handleGoogleLogin}>
                <FcGoogle className="text-2xl mr-2" /> Sign in with Google
              </button>
              <div className="text-end">
                <a href="/forgot-password" className="text-sm text-gray-500 hover:text-green-500">
                  Forgot Password?
                </a>
              </div>
              <button type="submit" className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
