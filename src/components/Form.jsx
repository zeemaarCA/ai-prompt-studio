import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
	return (
		<section className="max-w-full px-6 sm:px-0 sm:max-w-md items-center flex flex-col mx-auto">
			<h1 className="head_text text-center mb-5">
				<span className="blue_gradient">{type} Post</span>
			</h1>
			<p className="desc text-center max-w-md">
				{type} and share amazing prompts with the world, and let your
				imagination run wild with any AI-powered platform
			</p>

			<form
				onSubmit={handleSubmit}
				className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
			>
				<label className="flex flex-col gap-2">
					<span className="font-comforta font-semibold text-sm">
						Your AI Prompt
					</span>
					<textarea
						className="textarea textarea-bordered resize-none placeholder:text-gray-300 placeholder:font-poppins"
						value={post.prompt}
						onChange={(e) => setPost({ ...post, prompt: e.target.value })}
						placeholder="Write your post here"
						required
						rows="5"
					></textarea>
				</label>

				<label className="flex flex-col gap-2">
					<span className="font-comforta font-semibold text-sm">
						Field of Prompt{" "}
						<span className="font-normal">
							(#product, #webdevelopment, #idea, etc.)
						</span>
					</span>
					<input
						type="text"
						placeholder="#Tag"
            className="input input-bordered placeholder:text-gray-300 placeholder:text-sm placeholder:font-poppins"
            value={post.tag}
						onChange={(e) => setPost({ ...post, tag: e.target.value })}
					/>
				</label>

				<div className="flex justify-end items-center mx-3 mb-5 gap-4">
					<Link href="/" className="text-sm btn btn-ghost">
						Cancel
					</Link>

					<button
						type="submit"
						disabled={submitting}
						className="btn btn-gradient !text-white !disbled:opacity-50 !disabled:text-white"
					>
						{submitting ? `${type}ing...` : type}
					</button>
				</div>
			</form>
		</section>
	);
};

export default Form;
