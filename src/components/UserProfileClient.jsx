"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";

export default function UserProfileClient({ userId }) {
	const searchParams = useSearchParams();
	const userName = searchParams.get("name");

	const [userPosts, setUserPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/users/${userId}/posts`);
			const data = await response.json();

			setUserPosts(data);
		};

		if (userId) fetchPosts();
	}, [userId]);

	return (
		<Profile
			name={userName}
			desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
			data={userPosts}
		/>
	);
}
