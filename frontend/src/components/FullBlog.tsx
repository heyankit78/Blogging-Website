import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 pt-20 w-full px-10 max-w-screen-2xl">
          {/* Main Content */}
          <div className="col-span-8">
            <div className="text-3xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-2">Posted on 2nd Dec 2024</div>
            <div className="pt-4">{blog.content}</div>
          </div>
          {/* Sidebar */}
          <div className="col-span-4">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div>
                <Avatar size="big" name={blog.author.name} />
              </div>
              {/* Author Info */}
              <div>
                <div className="text-sm text-slate-400">Author</div>
                <div className="text-xl font-bold">{blog.author.name || "Anonymous"}</div>
                <div className="pt-2 text-slate-500">Random Catchphrase</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
