import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { FullBlog } from "../components/FullBlog";
import { LoadingComponent } from "../components/LoadingComponent";

export const Blog = () => {
  const { id } = useParams<{ id: string }>();
// Ensure `id` is not undefined before calling the hook
  const { loading, blog } = useBlog({ id: id || "default-id" }); 
  if (loading) {
    return <div>
      <LoadingComponent/>
    </div>;
  }

  if (!blog) {
    // Handle the case where the blog is not found
    return <div>Blog not found!</div>;
  }

  return (
    <div>
      <FullBlog blog={blog}/>
    </div>
  );
};
