import { signIn, signOut, useSession } from "next-auth/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

// Taken from merakiui
export default function Navbar() {
  const [session] = useSession();

  return (
    <nav className="shadow bg-gray-800">
      <div className="container px-6 py-4 mx-auto">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold text-gray-700">
              <a
                className="text-2xl font-bold text-white lg:text-3xl hover:text-gray-300"
                href="#"
              >
                Brand
              </a>
            </div>

            <div className="flex md:hidden">
              <button
                type="button"
                className="text-gray-200 hover:text-gray-400 focus:outline-none focus:text-gray-400"
                aria-label="toggle menu"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 md:flex md:items-center md:justify-between text-sm">
            <div className="flex flex-col -mx-4 md:flex-row md:items-center md:mx-8">
              <a
                href="#"
                className="px-2 py-1 mx-2 mt-2 font-medium transition-colors duration-200 transform rounded-md md:mt-0 text-gray-200 hover:bg-gray-700"
              >
                Join Slack
              </a>
              <a
                href="#"
                className="px-2 py-1 mx-2 mt-2 font-medium transition-colors duration-200 transform rounded-md md:mt-0 text-gray-200 hover:bg-gray-700"
              >
                Browse Topics
              </a>
              <a
                href="#"
                className="px-2 py-1 mx-2 mt-2 font-medium transition-colors duration-200 transform rounded-md md:mt-0 text-gray-200 hover:bg-gray-700"
              >
                Random Item
              </a>
              <a
                href="#"
                className="px-2 py-1 mx-2 mt-2 font-medium transition-colors duration-200 transform rounded-md md:mt-0 text-gray-200 hover:bg-gray-700"
              >
                Experts
              </a>
            </div>

            <div className="flex items-center mt-4 md:mt-0">
              {session ? (
                <>
                  <button
                    type="button"
                    className="flex items-center focus:outline-none mr-4 px-2 py-1 rounded-md hover:bg-gray-700"
                    aria-label="toggle profile dropdown"
                  >
                    <span className="mr-4 font-medium">
                      {session.user?.name}
                    </span>

                    <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                      <Image
                        className="object-cover w-full h-full"
                        src={session.user?.image || "https://picsum.photos/200"}
                        height={30}
                        width={30}
                      />
                    </div>
                  </button>
                  <button
                    className="inline-flex items-center w-max text-left bg-gray-500 hover:bg-gray-400 text-white font-medium py-2 px-4 rounded"
                    onClick={() => signOut()}
                  >
                    Sign out
                    <FontAwesomeIcon
                      className="ml-2"
                      width={18}
                      icon="sign-out-alt"
                    />
                  </button>
                </>
              ) : (
                <button
                  className="inline-flex items-center w-max text-left bg-gray-600 hover:bg-gray-400 text-white font-medium py-2 px-4 rounded"
                  onClick={() => signIn("discord")}
                >
                  Sign in
                  <FontAwesomeIcon
                    className="ml-2"
                    width={18}
                    icon="sign-in-alt"
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
