import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='mx-6'>
      <div className='max-w-lg mx-auto'>
      <h1 className='head_text text-center mb-5'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-center'>{desc}</p>
      </div>
      <div className='mt-10 grid grid-cols-12 gap-3'>
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
