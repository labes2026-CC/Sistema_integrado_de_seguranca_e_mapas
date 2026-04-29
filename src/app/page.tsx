import Image from "next/image";
import Sidebar from "./components/sidebar";
import Dashboard from "./dashboard/dashboard";

export default function Home() {
  return (
    <div className="pd-0 m-0">
      <main className="wd-full h-screen flex bg-gray-100 text-gray-900">
        <Sidebar></Sidebar>
        <Dashboard></Dashboard>
      </main>
    </div>
  );
}
