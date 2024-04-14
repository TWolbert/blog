"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye } from "react-bootstrap-icons";

export default function BlogPosts({ blogs }: { blogs: Blog[] }) {
    return (
        <div className=" pt-20 z-10 flex flex-col gap-5 items-center justify-center">
            {blogs.map((blog) => (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className=" bg-white p-2 shadow-xl  rounded-xl"
                    key={blog.id}
                >
                    <Link href={`/blogs/${blog.id}`}>
                        <img
                            alt={blog.title}
                            src={`/api/image/${blog.image_id}`}
                            className=" rounded-md w-[30vw] aspect-video object-cover border-neutral-500 shadow-sm border-2"
                        />
                        <div className=" p-1">
                            <div className=" flex justify-between">
                                <h2 className=" font-bold font-heading text-3xl">
                                    {blog.title}
                                </h2>
                                <div className=" flex items-center gap-2">
                                    <Eye />
                                    <span className="font-bold">{blog.views}</span>
                                </div>
                            </div>
                            <p>{blog.preview ?? 'No preview...'}</p>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
}
