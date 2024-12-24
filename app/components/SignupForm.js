"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SignUpForm = () => {

  const router = useRouter();
  const { status } = useSession();

  const handleOnClick = () => {
    signIn("google");
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "authenticated") {
    return null; // Render nothing while redirecting
  }

  return (
        <div>
          <div className="absolute z-10 font-medium flex justify-center items-center w-screen h-full">
            <section className="flex flex-col h-max items-center bg-slate-50 bg-opacity-20 border-gray-200 border-2 border-dashed p-2.5 px-6">
              <p className="text-4xl text-white my-5">Sign Up</p>
              <div className="flex flex-col space-y-4">
                <div className="bg-slate-100 bg-opacity-60 h-12 w-full flex items-center align-middle p-2 rounded-sm">
                  <input
                    className="bg-transparent w-full outline-none ps-5"
                    placeholder="Enter your Name"
                  ></input>
                </div>
                <div className="bg-slate-100 bg-opacity-60 h-12 w-full flex items-center align-middle p-2 rounded-sm">
                  <input
                    className="bg-transparent w-full outline-none ps-5"
                    placeholder="Enter your Email"
                  ></input>
                </div>
                <div className="bg-slate-100 bg-opacity-60 h-12 w-full flex items-center align-middle p-2 rounded-sm">
                  <input
                    className="bg-transparent w-full outline-none ps-5"
                    placeholder="Enter your Password"
                  ></input>
                </div>
                <button
                  className="bg-teal-200 my-3 w-full font-semibold h-12 border-2 active:scale-95 transition duration-200 drop-shadow-sm hover:scale-100 border-slate-300 rounded-xl bg-opacity-60 hover:bg-opacity-100"
                >
                  Sign up
                </button>
                <div className=" space-y-2 flex flex-col items-center">
                  <p className=" font-semibold text-gray-800 text-md">or</p>

                  <div className=" flex space-x-5"></div>
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
                </div>
                  <div className="flex justify-between font-medium text-sm">
                    <p className="text-gray-800">Already have an Account? </p>
                    <a
                      className="hover:cursor-pointer text-blue-600 hover:underline"
                      href="./login"
                    >
                      Sign in
                    </a>
                  </div>
              </div>
            </section>
          </div>
        </div>
        
  );
};

export default SignUpForm;
