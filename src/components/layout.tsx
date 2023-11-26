import { type ReactNode } from "react";
import Head from "next/head";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>SintoCheck</title>
        <link rel="icon" href="/favicon.jpeg" />
      </Head>
      <div className="">
        <main className="flex min-h-screen min-w-full flex-col items-center justify-center bg-slate-100 text-lg">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
