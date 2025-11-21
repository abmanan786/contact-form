import React, { useState } from "react";

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || "Something went wrong!");
      } else {
        alert(result.message || "Message sent successfully!");
      }

      // Clear form after success
      setForm({ name: "", email: "", message: "" });

    } catch (error) {
      console.error(error);
      alert("Server se connection nahi ho paaya!");
    }

    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Contact Form</h2>

        <input
          type="text"
          name="name"
          value={form.name}
          placeholder="Your Name"
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none"
        />

        <input
          type="email"
          name="email"
          value={form.email}
          placeholder="Your Email"
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none"
        />

        <textarea
          name="message"
          value={form.message}
          placeholder="Your Message"
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none"
          rows="4"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
