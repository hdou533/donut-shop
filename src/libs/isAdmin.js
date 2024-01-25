import { UserInfo } from '@/app/models/UserInfo';
import { getServerSession } from "next-auth";
import { authOptions } from '@/libs/authOptions';

export const isAdmin = async () => {
    
    const session = await getServerSession(authOptions)
    const userEmail = await session?.user?.email

    if (!userEmail) {
        return false
    }

    const userInfo = await UserInfo.findOne({email: userEmail})

    if (!userInfo) {
        return false

    }

    return userInfo.admin 
}
