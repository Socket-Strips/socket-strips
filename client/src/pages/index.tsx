import { useSession } from "next-auth/client";
import Head from "next/head";
import { useRouter } from "next/dist/client/router";
import Layout from "@components/Layout";

export const Home = (): JSX.Element => {
  const router = useRouter();
  const [session, loading] = useSession();

  if (loading) return <></>;

  if (session) {
    router.push("/atc");
  }

  return (
    <div>
      <Head>
        <title>Welcome to the template!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div
          className="mt-8 flex flex-col items-center"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1518228684816-9135c15ab4ea?w=1920")`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div
            className="py-48 flex flex-col items-center h-full w-full text-2xl font-bold"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
          >
            <span>Welcome to our strips website!</span>
            <span className="mt-10">
              Please sign in to file a plan or control.
            </span>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
