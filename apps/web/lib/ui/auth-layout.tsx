import React from "react";

type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
  description: string;
};

function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div className="bg-accent/10 px-16 py-12 rounded-[30px] max-w-157">
      <h1 className="text-[40px] font-semibold mb-5">{title}</h1>
      <p className="text-[20px] font-normal mb-8">{description}</p>
      {children}
    </div>
  );
}
export default AuthLayout;
