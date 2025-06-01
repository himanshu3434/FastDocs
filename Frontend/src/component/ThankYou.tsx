import React from "react";
import { BiCheckCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
// optional icon library

function ThankYou() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <BiCheckCircle className="text-green-500 w-16 h-16 mb-4" />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Thank You!</h1>
      <p className="text-gray-600 text-center mb-6">
        Your documents have been submitted successfully.
      </p>
    </div>
  );
}

export default ThankYou;
