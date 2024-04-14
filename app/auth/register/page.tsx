import axios from "axios";
import Form from "./form";

export default function RegisterPage() {
    return (
        <div className=" w-screen h-screen flex items-center justify-center flex-col">
            <h1 className=" font-bold text-2xl">Register</h1>
            <Form />
        </div>
    );
}
