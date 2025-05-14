import Image from "next/image";
import Hero from "./components/Hero";
import { FloatingNav } from "./components/ui/FloatingNav";
import { FaHome } from "react-icons/fa";
import Grid from "./components/Grid";
import RecentProjects from "./components/RecentProjects";
import { navItems } from "@/data";
import Experience from "./components/Experience";
import Blog from "./components/ui/Blog";
import Footer from "./components/ui/Footer";
import * as Sentry from '@sentry/nextjs';

export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
       <FloatingNav navItems={navItems} />
        <Hero />
        <Grid/>
        <RecentProjects/>
        <Blog/>
        <Experience/>
        <Footer/>
      </div>
    </main>
  );
}
