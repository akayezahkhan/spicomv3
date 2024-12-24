"use client";
import React, {useEffect} from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const LoginForm = () => {

  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user) {
      router.push("/dashboard");
    }
  }, [session, router]); // Dependency array ensures this runs when `session` changes.

  const handleOnClick = () => {
    signIn("google");
  };

  return (
    <div>
      <div className="absolute z-10 font-medium flex justify-center items-center w-screen h-full">
        <section className="flex flex-col h-max items-center bg-slate-50 bg-opacity-20 border-gray-200 border-2 border-dashed p-6">
          <p className="text-4xl text-white my-5">Sign In</p>
          <div className="flex flex-col space-y-4 mt-3">
            <div className=" space-y-2 flex flex-col items-center">
              <div className="flex">
                <button
                  className="flex items-center gap-2 rounded-lg pl-2 mb-2 shadow-md hover:drop-shadow-lg"
                  onClick={handleOnClick}
                >
                  <Image
                    src="/google-logo.png"
                    height={30}
                    width={30}
                    alt="Google-Logo"
                  />
                  <span className="bg-blue-500 text-white p-3 rounded-r-lg">
                    Continue with Google
                  </span>
                </button>
              </div>

              <p className=" font-semibold text-gray-800 text-md">or</p>
              <div className="space-y-1 pb-2">
                <p className="pl-2">Username</p>
                <div className="rounded-md bg-slate-100 bg-opacity-60 h-12 w-full flex items-center align-middle p-2">
                  <input
                    className="bg-transparent w-full outline-none ps-5"
                    placeholder="username"
                    type="text"
                  ></input>
                </div>
                <p className="pl-2">Password</p>
                <div className="rounded-md bg-slate-100 bg-opacity-60 h-12 w-full flex items-center align-middle p-2">
                  <input
                    className="bg-transparent w-full outline-none ps-5"
                    placeholder="password"
                    type="password"
                  ></input>
                </div>
              </div>
              <button
                className="bg-teal-200 my-3 w-full font-semibold h-12 border-2 active:scale-95 transition duration-200 drop-shadow-sm hover:scale-100 border-slate-300 rounded-xl bg-opacity-60 hover:bg-opacity-100"
              >
                Log in
              </button>
            </div>
            <div className="flex justify-between font-medium text-sm">
              <p className="text-gray-800">Dont have an Account? </p>
              <a className="hover:cursor-pointer text-blue-600 hover:underline" href="/signup">
                Register
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoginForm;
