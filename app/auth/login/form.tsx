"use client";

import axios from "axios";
import { toast } from "react-toastify";

export default function Form() {
    function Login(e: React.FormEvent<HTMLButtonElement>) {
        e.preventDefault();

        const form = e.currentTarget.parentElement;
        const formData = new FormData(form! as HTMLFormElement);

        const username = formData.get("name");
        const password = formData.get("password");

        fetch("/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name_or_email: username,
                password: password,
            }),
        })
            .then((res) => {
                res.json().then((data) => { 
                    toast.success(data.message);
                    document.location.href = "/";
                })
            })
            .catch((err) => {
                toast.error(err);
            });
    }

    return (
        <form className="w-fit h-fit flex flex-col gap-2">
            <input
                type="text"
                name="name"
                placeholder="Username or Email"
                className=" px-3 py-2 rounded-xl bg-neutral-200"
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                className=" px-3 py-2 rounded-xl bg-neutral-200"
            />
            <button
                onClick={(e) => Login(e)}
                type="submit"
                className=" bg-black text-white font-bold px-3 py-2 rounded-xl hover:shadow-xl shadow-sm transition-all"
            >
                Log in
            </button>
        </form>
    );
}
