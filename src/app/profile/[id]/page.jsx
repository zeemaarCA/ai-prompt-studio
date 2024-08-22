// src/app/profile/[id]/page.jsx

import UserProfileClient from "@components/UserProfileClient";


export async function generateStaticParmas() {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}/posts`);
	const userData = await response.json();
	return userData.map((user) => ({
		params: {
			id: user.id,
		},
	}));
}


// Function to generate metadata dynamically
export async function generateMetadata({ params }) {
	const { id } = params;

	// Fetch user data to set metadata
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}/posts`);
	const userData = await response.json();
	const userName = userData.length > 0 ? userData[0].creator.username : "User";

	return {
		title: `${userName}'s Profile`,
		description: `Explore ${userName}'s personalized profile page. Discover and get inspired by exceptional prompts.`,
	};
}

// Server-side component
export default async function UserProfile({ params }) {
	const { id } = params;

	// Fetch user posts on the server
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}/posts`);
	const userPosts = await response.json();

	// Pass data to the client-side component
	return (
		<div>
			<UserProfileClient userId={id} />
		</div>
	);
}
