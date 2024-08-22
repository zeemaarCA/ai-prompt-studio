"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";
import toast from "react-hot-toast";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session, status } = useSession();



  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });


  useEffect(() => {
    // Only redirect if the session status is "authenticated" or "unauthenticated"
    if (status === "unauthenticated") {
      router.push("/");
      toast.error("You need to be logged in to create a prompt");
    }
  }, [status]);

  if (status === "loading") {
    // While the session is being fetched, return null to avoid rendering the component
    return null;
  }


  const createPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        toast.success("Prompt created successfully");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
