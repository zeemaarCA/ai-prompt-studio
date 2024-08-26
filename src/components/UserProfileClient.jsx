"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";
import toast from "react-hot-toast";

export default function UserProfileClient({ userId }) {
	const searchParams = useSearchParams();
	const userName = searchParams.get("name");

	const [userPosts, setUserPosts] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				setLoading(true);
				const response = await fetch(`/api/users/${userId}/posts`);
				const data = await response.json();
				setLoading(false);
				setUserPosts(data);

			} catch (error) {
				toast.error("Failed to fetch posts");
			}
			finally {
				setLoading(false);
			}
		};

		if (userId) fetchPosts();
	}, [userId]);

	return (
		<Profile
			name={userName}
			desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
			data={userPosts}
			loading={loading}
		/>
	);
}
