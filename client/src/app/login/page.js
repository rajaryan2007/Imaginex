import LoginCard from "@/components/login/login-card";

import Image from "next/image";

function Login() {
    return (
        <div className="min-h-screen relative">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/bgImage.png')",
                }}
            />
            <div className="absolute inset-0 " style={{
                backgroundImage: "linear-gradient(180deg,rgba(0,0,0,0.8),rgba(0,0,0,0.4),rgba(0,0,0,0.8))",
            }}/>
            <div className="absolute top-4 left-4 z-10 " >
               <Image
                   src="/logo.svg"
                   alt="Logo"
                   width={180}
                   height={60}
                   priority
               />
            </div>
            <div className="relative  flex items-center justify-center min-h-screen z-10 " >
                <LoginCard/>
            </div>
        </div>
    );
}

export default Login;
