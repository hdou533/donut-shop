"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface UserTabProps {
  isAdmin: boolean;
}

const UserTab = ({ isAdmin }: UserTabProps) => {
  const path = usePathname();
  return (
    <div className="w-full flex overflow-x-auto items-center sm:justify-center gap-2 tabs py-4 mt-8">
      <Link className={path === "/profile" ? "active" : ""} href={"/profile"}>
        Profile
      </Link>
      {isAdmin && (
        <>
          <Link
            href={"/categories"}
            className={path === "/categories" ? "active" : ""}
          >
            Categories
          </Link>
          <Link
            href={"/menu-items"}
            className={path.includes("/menu-items") ? "active" : ""}
          >
            <span>Menu&nbsp;Items</span>
          </Link>
          <Link href={"/users"} className={path === "/users" ? "active" : ""}>
            Users
          </Link>
        </>
      )}

      <Link href={"/orders"} className={path === "/orders" ? "active" : ""}>
        Orders
      </Link>
    </div>
  );
};

export default UserTab;
