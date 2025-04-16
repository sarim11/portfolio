"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { TbMailForward } from "react-icons/tb";

function SendEmailForm() {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSendMail = async (e) => {
    e.preventDefault();

    if (!userInput.email || !userInput.message || !userInput.name) {
      alert("All fields are required!");
      return;
    }

    setLoading(true);

    // Replace with your EmailJS credentials. you can create account https://dashboard.emailjs.com/admin/account on this website
    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    try {
      const response = await emailjs.send(
        serviceID,
        templateID,
        userInput,
        publicKey
      );

      if (response.status === 200) {
        alert("Message sent successfully!");
        setUserInput({ name: "", email: "", message: "" });
      }
    } catch (error) {
      alert("Failed to send email. Please try again.");
      console.error("EmailJS Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-semibold text-white mb-4 text-center">
          Contact Me
        </h2>
        <form onSubmit={handleSendMail} className="space-y-4">
          <div>
            <label className="text-gray-300 block mb-1">Your Name:</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={userInput.name}
              onChange={(e) =>
                setUserInput({ ...userInput, name: e.target.value })
              }
              required
              className="w-full px-4 py-2 border rounded-md bg-gray-700 text-white focus:ring focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-gray-300 block mb-1">Your Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={userInput.email}
              onChange={(e) =>
                setUserInput({ ...userInput, email: e.target.value })
              }
              required
              className="w-full px-4 py-2 border rounded-md bg-gray-700 text-white focus:ring focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-gray-300 block mb-1">Your Message:</label>
            <textarea
              placeholder="Enter your message"
              value={userInput.message}
              onChange={(e) =>
                setUserInput({ ...userInput, message: e.target.value })
              }
              required
              className="w-full px-4 py-2 border rounded-md bg-gray-700 text-white focus:ring focus:ring-blue-400 focus:outline-none"
              rows="4"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:from-blue-600 hover:to-indigo-700 transition duration-200"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
              <TbMailForward size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SendEmailForm;
