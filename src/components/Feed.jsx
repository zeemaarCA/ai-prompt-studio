"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick, loading }) => {
	return (
		<>
			{loading ? (
				<div className="mt-16 grid grid-cols-12 gap-3">
					{[...Array(3)].map((_, index) => (
						<div key={index} className="flex col-span-12 sm:col-span-6 lg:col-span-4 flex-col gap-4">
							<div className="flex items-center gap-4">
								<div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
								<div className="flex flex-col gap-4">
									<div className="skeleton h-4 w-20"></div>
									<div className="skeleton h-4 w-28"></div>
								</div>
							</div>
							<div className="skeleton h-32 w-full"></div>
						</div>
					))}
				</div>
			) : (
				<div className="mt-16 grid grid-cols-12 gap-3 container mx-auto">
					{data.map((post) => (
						<PromptCard
							key={post._id}
							post={post}
							handleTagClick={handleTagClick}
						/>
					))}
				</div>
			)}
		</>
	);
};


const Feed = () => {
	const [allPosts, setAllPosts] = useState([]);
	const [loading, setLoading] = useState(false);

	// Search states
	const [searchText, setSearchText] = useState("");
	const [searchTimeout, setSearchTimeout] = useState(null);
	const [searchedResults, setSearchedResults] = useState([]);

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
			<form className="max-w-sm mx-auto relative">
				<input
					type="text"
					placeholder="Search Prompt"
					className="input input-bordered w-full max-w-xs"
					value={searchText}
					onChange={handleSearchChange}
					required
				/>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 16 16"
					fill="currentColor"
					className="h-4 w-4 opacity-70 absolute right-12 top-1/2 -translate-y-1/2"
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
				<PromptCardList
					data={searchedResults}
					handleTagClick={handleTagClick}
					loading={loading}
				/>
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
