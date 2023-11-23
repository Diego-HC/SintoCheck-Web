import Head from "next/head";
import Link from "next/link";
import Layout from "sintocheck/components/layout";

export default function Home() {
  return (
    <>
      <Head>
        <title>SintoCheck</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* login page */}
      <Layout>
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-6xl font-bold">
            Welcome to <strong>SintoCheck!</strong>
          </h1>

          <p className="mt-3 text-2xl">
            Get started by{" "}
            <Link className="underline text-blue-500" href="/dashboard">
              logging in
            </Link>
          </p>
        </main>
      </Layout>
    </>
  );
}
