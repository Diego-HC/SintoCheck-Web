import Link from "next/link";
import Layout from "sintocheck/components/layout";

export default function Home() {
  return (
    <Layout>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to <strong>SintoCheck!</strong>
        </h1>

        <p className="mt-3 text-2xl">
          Get started by{" "}
          <Link className="text-blue-500 underline" href="/dashboard">
            logging in
          </Link>
        </p>
      </main>
    </Layout>
  );
}
