import { signIn, signOut, useSession } from "next-auth/client";
import Image from "next/image";

export default function SessionDetails() {
  const [session] = useSession();

  return (
    <div className="max-w-lg bg-blue-200 p-4 rounded z-10 ml-4">
      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
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
  );
}
