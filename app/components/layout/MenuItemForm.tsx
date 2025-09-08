"use clinet";
import { useEffect, useState } from "react";
import { MenuItem } from "../../types/menuItem";
import EditableImage from "./EditableImage";
import { Category } from "../../types/category";

interface MenuItemFormProps {
  onSubmit: (e: React.FormEvent, data: Partial<MenuItem>) => void;
  menuItem?: Partial<MenuItem>;
}

const MenuItemForm = ({ onSubmit, menuItem }: MenuItemFormProps) => {
  const [name, setName] = useState(menuItem?.name || "");
  const [image, setImage] = useState(menuItem?.image || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [price, setPrice] = useState(menuItem?.price || "");
  const [category, setCategory] = useState(menuItem?.category || "");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }, []);

  return (
    <form
      className="mt-8"
      onSubmit={(e) => {
        onSubmit(e, {
          name,
          image,
          description,
          price: price === "" ? undefined : Number(price),
          category,
        });
      }}
    >
      <div className="flex flex-col sm:flex-row gap-8 justify-between">
        <div className="flex flex-col gap-4 items-center mt-2">
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className="grow max-w-sm">
          <label htmlFor="">Item name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="">Description</label>
          <textarea
            value={description}
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <label htmlFor="">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full text-wrap"
          >
            <option value="" disabled hidden></option>
            {categories?.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
          <label htmlFor="">Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button type="submit" className="mt-4">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default MenuItemForm;
