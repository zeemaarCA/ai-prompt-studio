"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Only redirect if the session status is "authenticated" or "unauthenticated"
    if (status === "unauthenticated") {
      router.push("/");
      toast.error("You need to be logged in to see the profile");
    }
  }, [status]);



  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
        setLoading(false);
        setMyPosts(data);

      } catch (error) {
        toast.error("Failed to fetch posts");
      }
      finally {
        setLoading(false);
      }
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  if (status === "loading") {
    // While the session is being fetched, return null to avoid rendering the component
    return null;
  }

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        toast.success("Prompt Deleted Successfully")

        const filteredPosts = myPosts.filter((item) => item._id !== post._id);

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (

    <Profile
      name='My'
      desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      loading={loading}
    />
  );
};

export default MyProfile;
