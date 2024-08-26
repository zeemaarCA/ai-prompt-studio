import Image from "next/image";
import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete, loading }) => {
	return (
		<section className="mx-6">
			<div className="max-w-lg mx-auto">
				<h1 className="head_text text-center mb-5">
					<span className="blue_gradient">{name} Profile</span>
				</h1>
				<p className="desc text-center">{desc}</p>
			</div>
			<div className="mt-10 grid grid-cols-12 gap-3">
			{loading ? (
          <div className="col-span-12 text-center">
            <Image
              src="/assets/icons/loader.svg" // Update with the correct path
              width={50}
              height={50}
              alt="Loading..."
              className="object-contain"
            />
					</div>
			) :	data.length === 0 ? (
					<div className="col-span-12 text-center">
						<h1 className="head_text">No Prompts Found</h1>
					</div>
				) : (
					<>
						{data.map((post) => (
							<PromptCard
								key={post._id}
								post={post}
								handleEdit={() => handleEdit && handleEdit(post)}
								handleDelete={() => handleDelete && handleDelete(post)}
							/>
						))}
					</>
				)}
			</div>
		</section>
	);
};

export default Profile;
