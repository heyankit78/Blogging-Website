import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar = () => {
    return(
        <div className="border-b border-slate-200 flex justify-between p-4">
            <div className="font-bold text-3xl flex justify-center flex-col">
                <Link to={"/blogs"}>
                Medium
                </Link>
            </div>
            <div className="flex justify-between items-center gap-3 p-4">
                <div>
                    <Link to={"/publish"}>
                    <button
                    type="submit"
                    className="text-white rounded-full bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                    Create
                    </button>
                    </Link>
                </div>
                <div>
                    <Avatar name="AG" size="big" />
                </div>
            </div>

        </div>
    )
}