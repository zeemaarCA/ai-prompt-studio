import "../app/globals.css";
import "@styles/globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@components/Navbar";
import AuthProvider from "@components/AuthProvider";
import { ReduxProvider } from "@components/ReduxProvider";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: {
    default: "Prompts Lab - Next.js",
    template: "%s | Prompts Lab - Next.js",
  },
  description: "Discover and share creative prompts for writing, drawing, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sora">
        <ReduxProvider>
          <ThemeProvider>
            <AuthProvider>
              <div className="main">
                <div className="gradient" />
              </div>
              <main className="app relative z-1">
                <Toaster
                  position="bottom-right"
                  toastOptions={{
                    className: "",
                    duration: 5000,
                    style: {
                      background: "#363636",
                      color: "#fff",
                    },
                    success: {
                      duration: 3000,
                      theme: {
                        primary: "green",
                        secondary: "black",
                      },
                    },
                  }}
                />
                <Navbar />
                {children}
              </main>
            </AuthProvider>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
