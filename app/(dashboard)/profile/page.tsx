"use client";

import { useSession } from "next-auth/react";
import UserTab from "@/components/layout/UserTab";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserForm from "@/components/layout/UserForm";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
import { Logout } from "@/components/icons/Logout";
import { User } from "@/types/user";
import router from "next/router";

const ProfilePage = () => {
  const session = useSession();
  // console.log(session)
  const [user, setUser] = useState<Partial<User>>({});
  const [admin, setAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);

  const status = session.status;
  const userData = session.data?.user;

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((res) => {
        res.json().then((data) => {
          setUser(data);
          setAdmin(data.admin);
          setProfileFetched(true);
        });
      });
    }
  }, [session, status]);

  const handleProfileUpdate = async (
    e: React.FormEvent,
    data: Partial<User>
  ) => {
    e.preventDefault();
    const save = (async () => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error();
    })();

    await toast.promise(save, {
      loading: "Saving...",
      success: "Profile updated!",
      error: "Error",
    });
  };

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  if (status === "loading" || !profileFetched) {
    return "Loading...";
  }

  return (
    <section className="max-w-lg mx-auto min-h-60">
      <UserTab isAdmin={admin} />
      <UserForm user={user} onSave={handleProfileUpdate} />
      <button
        onClick={() => {
          signOut();
          router.push("/");
        }}
        className="mb-8 flex gap-2 items-end text-gray-600 border-none text-left italic "
      >
        <Logout /> Logout
      </button>
    </section>
  );
};

export default ProfilePage;
