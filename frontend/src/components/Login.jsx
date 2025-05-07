import React from "react";

const Login = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Login Page</h1>
      <button 
        onClick={handleLogin} 
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Login with Google
      </button>
    </div>
  );
};

export default Login;
