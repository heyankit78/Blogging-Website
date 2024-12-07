import { Appbar } from "../components/Appbar";
import axios from "axios"
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Publish = () => {
    const navigate = useNavigate();
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");

    function publishBlog() {
      axios
        .post(
          `${BACKEND_URL}/api/v1/blog`,
          {
            title,     // Blog title
            content,   // Blog content
            published: true, // Set the blog as published
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"), // Add token for authorization
            },
          }
        )
        .then((res) => {
          navigate(`/blog/${res.data.id}`); // Navigate to blogs page after successful publish
        })
        .catch((error) => {
          console.error("Error publishing blog:", error.response?.data || error.message);
          alert("Failed to publish blog. Please try again.");
        });
    }    
  return (
    <>
      <Appbar />
      <div className="flex justify-center items-start py-10 bg-gray-100">
        <div className="w-full max-w-screen-lg bg-white p-8 rounded-lg shadow-xl">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-extrabold text-gray-700">Create Your Story</h1>
            <p className="text-gray-500 text-sm mt-1">
              Share your thoughts, experiences, or ideas with the world.
            </p>
          </div>

          {/* Title Input */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Title"
              onChange={(e)=>setTitle(e.target.value)}
              className="w-full text-4xl font-bold placeholder-gray-400 text-gray-700 focus:outline-none border-b-2  focus:border-blue-500 transition-all duration-300 p-2"
            />
          </div>

          {/* Content Input */}
          <div className="mb-8">
            <textarea
              onChange={(e)=>setContent(e.target.value)}
              placeholder="Write your story here..."
              className="w-full h-[400px] text-lg placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 border border-gray-200 rounded-lg p-6 shadow-sm transition-all duration-300 resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <button
              className="text-sm font-semibold text-gray-500 hover:text-gray-800 transition-all duration-300"
            >
              Save as Draft
            </button>
            <button onClick={publishBlog}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all duration-300"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
