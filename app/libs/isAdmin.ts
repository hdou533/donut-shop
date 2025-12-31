import { getServerSession } from "next-auth";
import { UserInfo } from "@/models/UserInfo";
import { authOptions } from "./authOptions";

export const isAdmin = async () => {
  const session = await getServerSession(authOptions);
  const userEmail = await session?.user?.email;

  if (!userEmail) {
    return false;
  }

  const userInfo = await UserInfo.findOne({ email: userEmail });

  if (!userInfo) {
    return false;
  }

  return userInfo.admin;
};
