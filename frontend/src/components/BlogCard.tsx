import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
  onBlogUpdate: (updatedBlog: { id: string; title: string; content: string }) => void;
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  id,
  onBlogUpdate
}: BlogCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postTitle, setPostTitle] = useState(title);
  const [postDescription, setPostDescription] = useState(content);


  const openModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPostTitle(title);
    setPostDescription(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  }; // Fixed missing closing brace

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Post updated:", postTitle, postDescription);
    axios
      .put(
        `${BACKEND_URL}/api/v1/blog/update`,
        {
          title: postTitle,
          content: postDescription,
          id:id
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log("Blog post updated successfully:", response.data);
        onBlogUpdate(response.data);
      })
      .catch((error) => {
        console.error("Error updating the blog post:", error);
      });

    setIsModalOpen(false);
   
    
  };

  return (
    <div>
      <div className="pt-2 relative">
        <div className="border-b border-slate-200 mt-2 pb-4 w-screen max-w-screen-md cursor-pointer">
          {/* Update Icon */}
          <div className="absolute top-4 right-2" onClick={openModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </div>
          <div className="absolute top-4 right-10 cursor-pointer">
            <Link to={`/blog/${id}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </Link>
          </div>

          {/* Blog Content */}
          <div className="flex">
            <div className="flex justify-center flex-col">
              <Avatar name={authorName} size="small" />
            </div>
            <div className="text-lg pl-2">{authorName} . </div>
            <div className="flex justify-center flex-col pl-2">
              <div className="text-base text-slate-500">{publishedDate}</div>
            </div>
          </div>
          <div className="font-bold text-2xl">{title}</div>
          <div className="font-light">
            {content.length > 300 ? content.slice(0, 300) + "...." : content}
          </div>
          <div className="text-slate-500 text-xs pt-2">
            {`${Math.ceil(content.length / 100)} minutes read`}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          id="crud-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="relative bg-white rounded-lg shadow p-6 w-96">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Edit Blog Post</h3>
              <button
                type="button"
                className="text-gray-400 hover:bg-gray-200 rounded-full p-2"
                onClick={closeModal}
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal body */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  className="w-full p-2 mt-1 border rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows="4"
                  value={postDescription}
                  onChange={(e) => setPostDescription(e.target.value)}
                  className="w-full p-2 mt-1 border rounded-md"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2 text-white bg-blue-600 rounded-lg"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export const Avatar = ({ name, size = "small" }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-blue-200 rounded-full ${
        size === "small" ? "w-6 h-6" : "w-10 h-10"
      }`}
    >
      <span className={`font-medium text-gray-600`}>{name[0]}</span>
    </div>
  );
};
