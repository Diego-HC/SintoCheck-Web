import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>SintoCheck</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* login page */}
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-6xl font-bold">
            Welcome to <strong>SintoCheck!</strong>
          </h1>

          <p className="mt-3 text-2xl">
            Get started by{" "}
            <Link href="/login">
              logging in
            </Link>
          </p>
        </main>
      </div>
    </>
  );
}
