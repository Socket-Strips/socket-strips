import { ReactNode } from "react";
import Navbar from "./Navbar";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="bg-gray-700 text-gray-200 min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}
