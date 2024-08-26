"use client";
import { ThemeToggle } from "@components/ThemeToggle";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";
import { BiPencil } from "react-icons/bi";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useDispatch } from "react-redux";
import { signoutSuccess } from "@store/user/userSlice";

export default function Navbar() {
	const [providers, setProviders] = useState(null);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		const setupProviders = async () => {
			const response = await getProviders();
			setProviders(response);
		};
		setupProviders();
	}, []);

	const { data: session } = useSession();

	const handleSignIn = (providerId) => {
		setLoading(true);
		signIn(providerId).catch(() => {
			setLoading(false); // In case of error
		});
	};

	const handleSignOut = () => {
    signOut().then(() => {
      dispatch(signoutSuccess());
    });
  };

	return (
		<div className="navbar justify-between px-0 py-3">
			<div className="">
				<Link href="/" className="btn btn-ghost text-xl text_gradient">
					<Image
						src="/assets/images/logo.svg"
						alt="logo"
						width={30}
						height={30}
					></Image>
				</Link>
			</div>
			{/* {alert(session)} */}
			<div className="">
				<div className="flex items-center pr-3 gap-3">
					<ThemeToggle />
					{session?.user ? (
						<>
							<Link href="/create-prompt" className="btn btn-gradient">
								<BiPencil /> Create Prompt
							</Link>
							<div className="dropdown dropdown-end">
								<div
									tabIndex={0}
									role="button"
									className="btn btn-ghost btn-circle avatar"
								>
									<div className="w-10 rounded-full">
										<Image
											alt="profile pic"
											src={session?.user.image}
											width={30}
											height={30}
											className="!object-contain"
										/>
									</div>
								</div>
								<ul
									tabIndex={0}
									className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow border border-solid border-gray-500"
								>
									<li>
										<Link
											className="justify-between text-gray-800 dark:text-gray-100"
											href="/profile"
										>
											Profile
											<span className="badge">New</span>
										</Link>
									</li>
									<li>
										<button
											type="button"
											onClick={handleSignOut}
											className="border-0 bg-transparent font-medium"
										>
											Sign Out
										</button>
									</li>
								</ul>
							</div>
						</>
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
			</div>
		</div>
	);
}
