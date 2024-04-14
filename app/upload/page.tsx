"use client";

export default function Upload() {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;
        const file = form.querySelector("input[type=file]") as HTMLInputElement;

        // Base 64 encode the file
        const reader = new FileReader();
        reader.readAsDataURL(file.files![0]);

        reader.onload = function () {
            fetch("/api/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    file: reader.result,
                }),
            })
                .then((res) => {
                    res.json().then((data) => {
                        console.log(data);
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        };
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Upload a file</label>
            <input type="file" />
            <button type="submit">Upload</button>
        </form>
    );
}
