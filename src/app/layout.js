import {Inter} from "next/font/google";
import "./globals.css";
import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";
import React from "react";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({children}) {
  return (
      <html lang="en">
      <head>

        <title>{metadata.title}</title>

        <link rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/@materializecss/materialize@2.0.3-alpha/dist/css/materialize.min.css"/>

        <script
            src="https://cdn.jsdelivr.net/npm/@materializecss/materialize@2.0.3-alpha/dist/js/materialize.min.js"></script>

      </head>
      <body className={inter.className}>
      <Header/>
      <section style={{minHeight: '250px'}}>
        {children}
      </section>
      <Footer/>
      </body>
      </html>
  );
}
