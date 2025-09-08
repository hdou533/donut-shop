"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { User, UserProfile } from "@/types/user";
import { useProfile } from "@/components/UseProfile";
import UserTab from "@/components/layout/UserTab";
import UserForm from "@/components/layout/UserForm";

const EditUserPage = () => {
  const { loading, data } = useProfile() as UserProfile;
  const [user, setUser] = useState<User>();
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/profile?_id=${id}`).then((res) => {
      res.json().then((user) => {
        setUser(user);
      });
    });
  }, [id]);

  const handleSaveProfile = async (e: React.FormEvent, data: User) => {
    e.preventDefault();

    const promise: Promise<void> = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _id: id }),
      });

      if (response.ok) {
        resolve();
      } else {
        reject();
      }

      await toast.promise(promise, {
        loading: "loading...",
        success: "updated",
        error: "Error",
      });
    });
  };

  if (loading) {
    return "Loading user profile";
  }

  if (!data || !data.admin) {
    return "Not an admin";
  }

  return (
    <section className="max-w-xl mx-auto min-h-60">
      <UserTab isAdmin={data.admin} />
      <UserForm user={user} onSave={handleSaveProfile} />
    </section>
  );
};

export default EditUserPage;
