import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { LoadingComponent } from "../components/LoadingComponent";
import { useBlogs } from "../hooks";
import { useLocation } from "react-router-dom";

export const Blogs = () => {
   const {loading,blogs,refetch} = useBlogs();
   const location = useLocation();

   // Access the passed data (updatedName)
   const updatedName = location.state?.updatedName;

   if(loading){
    return(
        <>
        <div>
            <Appbar name={updatedName}/>
        </div>
        <div>
           <LoadingComponent/>
        </div>
        </>
    )
   }   
    return(
        
        <div className="mx-40">
        <Appbar name={updatedName}/>
            <div className="flex justify-center">
                <div className="max-w-md lg:max-w-none">
                {blogs.map(blog=>
                <BlogCard 
                    authorName={blog.author.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    id={blog.id}
                    authorId={blog.authorId}
                    onBlogUpdate={refetch}
                    publishedDate="13 May 2024"/>
                )}
                </div>
               
                
            </div>
        </div>
    )
}