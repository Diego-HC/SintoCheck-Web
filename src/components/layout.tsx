import { type ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="">
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-100 text-lg min-w-full">{children}</main>
    </div>
  );
};

export default Layout;
