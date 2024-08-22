"use client"
import Feed from "@components/Feed";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { FaRegUser } from "react-icons/fa";

export default function Home() {
	const { data: session } = useSession();
	const [providers, setProviders] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const setupProviders = async () => {
			const response = await getProviders();
			setProviders(response);
		};
		setupProviders();
	}, []);

	const handleSignIn = (providerId) => {
		setLoading(true);
		signIn(providerId)
			.catch(() => {
				setLoading(false); // In case of error
			});
	};

	return (
		<>
			<section className="w-full py-12 md:py-24 lg:py-32 flex justify-center">
				<div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-6 mt-12">
					<div className="space-y-4 text-center">
						<h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl/none">
							Discover & Share
							<br className="max-md:hidden" />
							<span className="text_gradient text-center">
								{" "}
								AI-Powered Prompts
							</span>
						</h1>
						<p className="max-w-[700px] text-white md:text-xl mx-auto">
							Prompt Studio is an open-source AI prompting tool for modern world to
							discover, create and share creative prompts
						</p>
					</div>
						{session?.user ? (
						<Link href="/create-prompt" className="btn btn-gradient">Create Prompt</Link>
							) : (
								<>
							{providers &&
								Object.values(providers).map((provider) => (
									<button
										key={provider.name}
										onClick={() => handleSignIn(provider.id)}
										className="btn btn-gradient"
										disabled={loading}
									>
										{loading ? (
											<span className="loading loading-spinner"></span>
										) : (
											<>
												<FaRegUser /> Sign in
											</>
										)}
									</button>
								))}
						</>
						)}

				</div>
			</section>
			<Feed />
		</>
	);
}
