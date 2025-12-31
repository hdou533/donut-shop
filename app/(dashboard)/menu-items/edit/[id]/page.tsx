"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DeleteBtn from "@/components/DeleteBtn";
import { UserProfile } from "@/types/user";
import { useProfile } from "@/components/UseProfile";
import UserTab from "@/components/layout/UserTab";
import MenuItemForm from "@/components/layout/MenuItemForm";
import { MenuItem } from "@/types/menuItem";

const EditMenuItemPage = () => {
  const router = useRouter();
  const [menuItem, setmenuItem] = useState<MenuItem | null>(null);

  const { data: profileData, loading: profileLoading } = useProfile();
  const { id } = useParams();
  const menuItemId = Array.isArray(id) ? id[0] : id;

  useEffect(() => {
    fetch(`/api/menu-items`).then((res) => {
      res.json().then((items: MenuItem[]) => {
        const item = items.find((i: MenuItem) => i._id === id);
        setmenuItem(item || null);
      });
    });
  }, []);

  const handleMenuItemSubmit = (
    e: React.FormEvent,
    data: Partial<MenuItem>
  ) => {
    e.preventDefault();
    data = { ...data, _id: menuItemId };
    const createPromise: Promise<void> = new Promise(
      async (resolve, reject) => {
        const response = await fetch("/api/menu-items/", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          resolve();
        } else {
          reject();
        }
      }
    );

    toast.promise(createPromise, {
      loading: "Updating the menu item...",
      success: "Updated",
      error: "error",
    });

    router.push("/menu-items");
  };

  const handleDeleteClick = async () => {
    const promise: Promise<void> = new Promise(async (reslove, reject) => {
      const response = await fetch("/api/menu-items?_id=" + id, {
        method: "DELETE",
      });

      if (response.ok) {
        reslove();
      } else {
        reject;
      }
    });

    await toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted",
      error: "Error",
    });

    router.push("/menu-items");
  };

  if (profileLoading) {
    return "Loading user info...";
  }

  if (profileData && !profileData.admin) {
    return "Not an Admin";
  }

  return (
    <section className="max-w-xl mx-auto min-h-60 mb-8">
      <UserTab isAdmin={profileData ? profileData.admin : false} />
      <div className="max-w-lg mx-auto text-cetner mt-4">
        <Link href={"/menu-items"} className="">
          <span className="underline underline-offset-4 hover:decoration-primary hover:text-primary ">
            Show all menu items
          </span>
        </Link>
      </div>

      <MenuItemForm
        menuItem={menuItem ?? undefined}
        onSubmit={handleMenuItemSubmit}
      />

      <div className="max-w-sm ml-auto mt-4">
        <DeleteBtn label={"Delete this item"} onDelete={handleDeleteClick} />
      </div>
    </section>
  );
};

export default EditMenuItemPage;
