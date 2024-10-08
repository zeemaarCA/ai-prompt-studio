"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
	const { data: session } = useSession();
	const pathName = usePathname();
	const router = useRouter();

	const [copied, setCopied] = useState("");

	const handleProfileClick = () => {
		if (post.creator._id === session?.user.id) return router.push("/profile");

		router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
	};

	const handleCopy = () => {
		setCopied(post.prompt);
		navigator.clipboard.writeText(post.prompt);
		setTimeout(() => setCopied(false), 3000);
	};

	return (
		<div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 glass-effect rounded-md p-4 flex flex-col justify-start">
			<div className="flex justify-between items-start gap-5">
				<div
					className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
					onClick={handleProfileClick}
				>
					<Image
						src={post?.creator?.image}
						alt="user_image"
						width={40}
						height={40}
						className="rounded-full object-contain"
					/>

					<div className="flex flex-col">
						<h3 className="font-lora text-base font-semibold">
							{post?.creator?.username}
						</h3>
						<p className="font-inter text-xs">{post?.creator?.email}</p>
					</div>
				</div>

				<div className="copy_btn" onClick={handleCopy}>
					<Image
						src={
							copied === post.prompt
								? "/assets/icons/tick.svg"
								: "/assets/icons/copy.svg"
						}
						alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
						width={20}
						height={20}
						className="cursor-pointer"
					/>
				</div>
			</div>

			<p className="my-4 text-sm self-start">{post?.prompt}</p>
			<p className="font-inter text-sm blue_gradient border-solid border-0 border-t-2 pt-3 border-gray-500 mt-auto">
				{post.tag.split(",").map((tag, index) => (
					<span
						key={index}
						onClick={() => handleTagClick && handleTagClick(tag.trim())}
						className="cursor-pointer blue_gradient"
					>
						#{tag.trim()}{" "}
					</span>
				))}
			</p>
			{session?.user.id === post?.creator?._id && pathName === "/profile" && (
				<div className="mt-5 flex gap-4 border-t border-gray-100 pt-3">
					<p
						className="edit-btn"
						onClick={handleEdit}
					>
						Edit
					</p>
					<p
						className="delete-btn"
						onClick={handleDelete}
					>
						Delete
					</p>
				</div>
			)}
		</div>
	);
};

export default PromptCard;
