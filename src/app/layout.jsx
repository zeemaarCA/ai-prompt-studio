import "../app/globals.css";
import "@styles/globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
	title: {
		default: "Prompts Lab - Next.js",
		template: "%s | Prompts Lab - Next.js"
	},
	description:
		"Discover and share creative prompts for writing, drawing, and more.",
};
// import { GeistSans } from 'geist/font/sans';
import Navbar from "@components/Navbar";
import Provider from "@components/Provider";

export default function RootLayout({ children }) {
	return (
		// <html lang="en" className={GeistSans.className}>
		<html lang="en" data-theme="dark">
			<body className="font-poppins">
				<Provider>
					<div className="main">
						<div className="gradient" />
					</div>

					<main className="app">
						<Toaster
							position="bottom-right"
							toastOptions={{
								// Define default options
								className: "",
								duration: 5000,
								style: {
									background: "#363636",
									color: "#fff",
								},

								// Default options for specific types
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
				</Provider>
			</body>
		</html>
	);
}
