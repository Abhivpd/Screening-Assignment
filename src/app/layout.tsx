import "~/styles/globals.css";
import { Inter } from "next/font/google";
import Header from "~/components/Header";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Screening Assignment",
  description: "This is a Screening Assignment",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} min-h-screen`}>
        <Header />
        <main className="container mx-auto my-10 flex justify-center">
          <section className="border-primary px-[60px] py-10">
            {children}
          </section>
          <Toaster />
        </main>
      </body>
    </html>
  );
}
