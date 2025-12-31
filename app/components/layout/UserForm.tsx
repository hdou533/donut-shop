"use client";
import EditableImage from "@/components/layout/EditableImage";

import { useState } from "react";
import { useProfile } from "../UseProfile";
import { User } from "@/types/user";

interface UserFormProps {
  user: Partial<User>;
  onSave: (e: React.FormEvent<HTMLFormElement>, user: Partial<User>) => void;
}

const UserForm = ({ user, onSave }: UserFormProps) => {
  const [username, setUsername] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [streetAddress, setStreetAddres] = useState(user?.streetAddress || "");
  const [city, setCity] = useState(user?.city || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");
  const [country, setCountry] = useState(user?.country || "");
  const [admin, setAdmin] = useState(user?.admin || false);

  const { data: profileData } = useProfile();

  if (!profileData) return null;

  return (
    <div className="flex flex-col sm:flex-row gap-4 my-12">
      <div className="flex flex-col gap-4 items-center bg-gray-100 p-4">
        <EditableImage link={image} setLink={setImage} />
      </div>

      <form
        className=" grow"
        onSubmit={(e) =>
          onSave(e, {
            name: username,
            email: user.email,
            image,
            phone,
            streetAddress,
            city,
            postalCode,
            country,
            admin,
          })
        }
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user?.email}
            disabled
          />

          <label htmlFor="tel">Phone Number</label>
          <input
            type="tel"
            name="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <label htmlFor="streetAddress">Street Address</label>
          <input
            type="text"
            name="streetAddress"
            placeholder="Street Address"
            value={streetAddress}
            onChange={(e) => setStreetAddres(e.target.value)}
          />

          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />

          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <label htmlFor="country">Country</label>
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          {profileData.admin && (
            <div className="flex gap-2">
              <label htmlFor="adminCb">Admin</label>
              <input
                id="adminCb"
                type="checkbox"
                value={"1"}
                checked={admin}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAdmin(e.target.checked)
                }
              />
            </div>
          )}
        </div>

        <button type="submit" className="mt-4">
          Save
        </button>
      </form>
    </div>
  );
};

export default UserForm;
