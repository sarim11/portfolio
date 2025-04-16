import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";
import ScrollToTop from "./components/helper/scroll-to-top";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portfolio of Muhammad Ans - Front End Developer",
  description:
    "My name is Muhammad Ans. I am a self-motivated IT professional with a strong foundation in problem-solving and a passion for continuous learning in web technologies. As a frontend developer, I have experience delivering high-quality, dynamic, and responsive websites for international clients. I am seeking a remote position where I can leverage my expertise in modern frontend development to contribute to a global team. I am open to job opportunities that align with my skills and my passion for building secure, efficient, and user-friendly web applications. I am open to job opportunities that align with my skills."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          <Navbar />
          {children}
          <ScrollToTop />
        </main>
        <Footer />
      </body>
    </html>
  );
}
