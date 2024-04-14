import { user } from "@/server/Database/schema";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { getUsers } from "./queries/usersQuery";
import { sFetch } from "@/server/Framework/Logic/ServerFetch";
import Image from "next/image";
import BlogPosts from "./blogPosts";

type BlogsResponse = {
    blogs: Blog[]
}

export default async function Index() {
    const blogsResponse = await sFetch("/api/blogs", "GET") as BlogsResponse

    const blogs = blogsResponse.blogs;
 
    return (
        <div className=" bg-neutral-100 h-full w-full">
            <div className="w-fit mx-auto flex items-center justify-center flex-col overflow-hidden">
                <div className=" blur-md shadow-md w-[110vw] left-10 h-[20rem] bg-blue-300 absolute -top-[10vh] rounded-full z-0"></div>
                <div className=" blur-md shadow-md w-[110vw] left-10 h-[20rem] bg-blue-500 absolute -top-[15vh] rounded-full z-0"></div>
                <div className=" blur-md shadow-md w-[110vw] left-10 h-[20rem] bg-blue-700 absolute -top-[20vh] rounded-full z-0"></div>
                <div className="z-10">
                    <h1 className="text-[10vh] font-bold font-heading z-10">WLBT</h1>
                    <p className="text-xl z-10">Here you can find, opinions, hot-takes and explainers written by Teun Wolbert.</p>
                </div>

            </div>

            <BlogPosts blogs={blogs} />
            <Link href="/auth/register">Register</Link>
        </div>
    );
}
