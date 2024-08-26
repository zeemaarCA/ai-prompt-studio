import PromptCard from "./PromptCard";
export default function PromptCardList({ data, handleTagClick, loading }) {
	return (
		<>
			{loading ? (
				<div className="mt-16 grid grid-cols-12 gap-3">
					{[...Array(6)].map((_, index) => (
						<div
							key={index}
							className="flex col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 flex-col gap-4"
						>
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
}
