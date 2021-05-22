import { signIn, signOut, useSession } from "next-auth/client";
import Image from "next/image";

export default function SessionDetails() {
  const [session] = useSession();

  return (
    <div className="absolute right-4 w-max bg-blue-100 shadow-md p-3 rounded-md">
      <div className="">
        {!session && (
          <>
            Not signed in <br />
            <button
              className="mt-4 w-max text-left bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
              onClick={() => signIn()}
            >
              Sign in
            </button>
          </>
        )}
        {session && (
          <div className="flex flex-col">
            <div className="flex text-center items-center">
              <p className="mr-2">
                Signed in as <b>{session.user?.name}</b>
              </p>
              <Image
                className="h-7 w-7 rounded-full"
                src={session.user?.image || "https://picsum.photos/200"}
                height={30}
                width={30}
              />
            </div>
            <button
              className="mt-4 w-max text-left bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
