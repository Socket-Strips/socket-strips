import Layout from "@components/Layout";
import Head from "next/head";

export default function contact() {
  return (
    <div>
      <Head>
        <title>Contact Us</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className="flex flex-col items-center">
          <div className="span">Hello there!</div>
        </div>
      </Layout>
    </div>
  );
}
