'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

const UserTab = ({ isAdmin }) => {
    const path = usePathname()
    return (
        <div className="flex justify-center gap-2 tabs my-8">
            <Link
                className={path === '/profile' ? 'active' : ''}
                href={'/profile'}>
                Profile
            </Link>
            {isAdmin && (
            <>
                <Link 
                    href={'/categories'}
                    className={path === '/categories' ? 'active' : ''}
                >
                    Categories
                </Link>
                <Link
                    href={'/menu-items'}
                    className={path.includes('/menu-items') ? 'active' : ''}
                >
                    Menu Items
                </Link>
                <Link
                    href={'/users'}
                    className={path === '/users' ? 'active' : ''}
                >
                    Users
                </Link>
                
            </>
            )}
           
                <Link
                    href={'/orders'}
                    className={path === '/orders' ? 'active' : ''}
                >
                    Orders
                </Link>
        </div>
    );
}
 
export default UserTab;
