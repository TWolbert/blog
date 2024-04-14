import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryClientProvider } from "./queryClientProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient();
    return (
        <ReactQueryClientProvider>
            <html>
                <head>
                    <title>{`${process.env.NEXT_APP_NAME} - ${process.env.NEXT_BRAND_NAME}`}</title>
                </head>
                <body className={inter.className + ' h-screen w-screen overflow-x-hidden antialiased text-neutral-900'}>
                    <ToastContainer theme="colored" />

                    {children}
                </body>
            </html>
        </ReactQueryClientProvider>
    );
}
