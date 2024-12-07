import { useCallback, useEffect,useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"

export interface Blog {
  content: string;
  title: string;
  id: string;
  authorId: string;
  author: {
    name: string;
  };
}

export const useBlog = ( id : { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | null>(null); // Nullable Blog type for initial state

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`, // Include "Bearer" prefix if using JWT
          },
        });
        setBlog(response.data.blog);
      } catch (error) {
        console.error("Failed to fetch the blog:", error);
      } finally {
        setLoading(false); // Always stop loading, even on error
      }
    };

    fetchBlog();
  }, [id]);

  return {
    loading,
    blog, // Use singular name as it represents one blog
  };
};


export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  // Function to fetch blogs from the API
  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setBlogs(response.data.blog);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Automatically fetch blogs on initial render
  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return {
    loading,
    blogs,
    refetch: fetchBlogs, // Provide the refetch function
  };
};


