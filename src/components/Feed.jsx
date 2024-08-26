"use client";

import { useState, useEffect } from "react";
import PromptCardList from "./PromptCardList";

const Feed = () => {
	const [allPosts, setAllPosts] = useState([]);
	const [loading, setLoading] = useState(false);

	// Search states
	const [searchText, setSearchText] = useState("");
	const [searchTimeout, setSearchTimeout] = useState(null);
	const [searchedResults, setSearchedResults] = useState([]);
	const [noResults, setNoResults] = useState(false);

	const fetchPosts = async () => {
		setLoading(true);
		const response = await fetch("/api/prompt");
		const data = await response.json();

		setAllPosts(data);
		setLoading(false);
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	const filterPrompts = (searchtext) => {
		if (allPosts.length === 0) {
			return [];
		}
		const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
		return allPosts.filter(
			(item) =>
				regex.test(item.creator.username) ||
				regex.test(item.tag) ||
				regex.test(item.prompt)
		);
	};

	const handleSearchChange = (e) => {
		clearTimeout(searchTimeout);
		setSearchText(e.target.value);

		// debounce method
		setSearchTimeout(
			setTimeout(() => {
				const searchResult = filterPrompts(e.target.value);
				setSearchedResults(searchResult);
				setNoResults(searchResult.length === 0);
			}, 500)
		);
	};

	const handleTagClick = (tagName) => {
		setSearchText(tagName);

		const searchResult = filterPrompts(tagName);
		setSearchedResults(searchResult);
	};

	return (
		<section className="feed p-8">
			<form className="max-w-full md:max-w-sm mx-auto relative">
				<input
					type="text"
					placeholder="Search Prompt..."
					className="input input-bordered w-full max-w-full placeholder:text-gray-400 font-sora"
					value={searchText}
					onChange={handleSearchChange}
					required
				/>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 16 16"
					fill="currentColor"
					className="h-4 w-4 opacity-70 absolute right-4 top-1/2 -translate-y-1/2"
				>
					<path
						fillRule="evenodd"
						d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
						clipRule="evenodd"
					/>
				</svg>
			</form>

{/* All Prompts */}
			{searchText ? (
				noResults ? (
					<p className="text-center mt-4">No posts found related to your search.</p>
				) : (
					<PromptCardList
						data={searchedResults}
						handleTagClick={handleTagClick}
						loading={loading}
					/>
				)
			) : (
				<PromptCardList
					data={allPosts}
					handleTagClick={handleTagClick}
					loading={loading}
				/>
			)}
		</section>
	);
};

export default Feed;
