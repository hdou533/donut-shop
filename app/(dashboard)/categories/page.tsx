"use client";
import DeleteBtn from "@/components/DeleteBtn";
import { useProfile } from "@/components/UseProfile";
import UserTab from "@/components/layout/UserTab";
import { Category } from "@/types/category";
import { FormEvent } from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CategoriesPage = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const { data: profileData, loading: profileLoading } = useProfile();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch("/api/categories").then((res) => {
      if (!res.ok) {
        throw new Error("response was not ok");
      }
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  };

  const handleCategorySubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const createPromise = (async () => {
      const data = editCategory
        ? { _id: editCategory._id, name: categoryName }
        : { name: categoryName };

      const response = await fetch("/api/categories", {
        method: editCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error();
      setCategoryName("");
      fetchCategories();
      setEditCategory(null);
    })();

    toast.promise(createPromise, {
      success: editCategory ? "Category updated" : "New category created",
      loading: editCategory
        ? "Updating category..."
        : "Creating your new category...",
      error: "Error!",
    });
  };

  const handleDeleteSubmit = async (_id: string) => {
    const promise = (async () => {
      const response = await fetch("/api/categories?_id=" + _id, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error();
    })();

    await toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted",
      error: "Error",
    });

    fetchCategories();
  };

  if (profileLoading) {
    return "Loading user info...";
  }
  if (profileLoading) return "Loading user info...";
  if (!profileData) return null;
  if (!profileData.admin) return "Not an admin";

  return (
    <section className="max-w-lg mx-auto min-h-60 mb-8">
      <UserTab isAdmin={profileData.admin} />

      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <h2 className="my-4 font-semibold">
          {editCategory
            ? `Update category: ${editCategory.name}`
            : "Add a new category: "}
        </h2>
        <div className="flex items-end gap-4">
          <div className="grow">
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button type="submit">{editCategory ? "Update" : "Create"}</button>
            <button
              type="button"
              onClick={() => {
                setEditCategory(null);
                setCategoryName("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
        <div className="flex"></div>
      </form>
      <h2 className="my-4 font-semibold">Current Categories</h2>
      <ul className="">
        {categories?.length > 0 &&
          categories.map((c) => (
            <li
              key={c._id}
              className="mb-2 flex justify-between items-center gap-4 border rounded-lg p-2"
            >
              <div className=" grow ">{c.name}</div>
              <div className="flex gap-2 max-h-10">
                <button
                  onClick={() => {
                    setEditCategory(c);
                    setCategoryName(c.name);
                  }}
                >
                  Edit
                </button>
                <DeleteBtn
                  label={"Delete"}
                  onDelete={() => handleDeleteSubmit(c._id)}
                />
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default CategoriesPage;
