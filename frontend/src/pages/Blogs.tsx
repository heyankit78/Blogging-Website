import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { LoadingComponent } from "../components/LoadingComponent";
import { useBlogs } from "../hooks"

export const Blogs = () => {
   const {loading,blogs,refetch} = useBlogs();

   if(loading){
    return(
        <>
        <div>
            <Appbar/>
        </div>
        <div>
           <LoadingComponent/>
        </div>
        </>
    )
   }   
    return(
        
        <div className="mx-40">
        <Appbar/>
            <div className="flex justify-center">
                <div className="max-w-md lg:max-w-none">
                {blogs.map(blog=>
                <BlogCard 
                    authorName={blog.author.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    id={blog.id}
                    onBlogUpdate={refetch}
                    publishedDate="13 May 2024"/>
                )}
                </div>
               
                
            </div>
        </div>
    )
}