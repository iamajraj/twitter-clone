/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import SidebarMenuItem from "./SidebarMenuItem";
import { HomeIcon } from "@heroicons/react/solid";
import {
    HashtagIcon,
    BellIcon,
    InboxIcon,
    DotsCircleHorizontalIcon,
    BookmarkIcon,
    ClipboardIcon,
    UserIcon,
    DotsHorizontalIcon,
    LoginIcon,
} from "@heroicons/react/outline";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Sidebar() {
    const { data: session } = useSession();
    return (
        <div className="hidden xl:w-[270px] sm:flex flex-col p-2 xl:items-start fixed h-full">
            {/* Twitter Logo */}
            <div className="hoverEffect p-0 hover:bg-blue-100 xl:px-1">
                <Image
                    width="50"
                    height="50"
                    src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
                    alt="logo"
                />
            </div>
            {/* Menu */}
            <div className="mt-4 mb-2.5 xl:items-start">
                <SidebarMenuItem active text="Home" Icon={HomeIcon} />
                <SidebarMenuItem text="Explore" Icon={HashtagIcon} />
                {session && (
                    <>
                        <SidebarMenuItem text="Notifications" Icon={BellIcon} />
                        <SidebarMenuItem text="Messages" Icon={InboxIcon} />
                        <SidebarMenuItem text="Bookmark" Icon={BookmarkIcon} />
                        <SidebarMenuItem text="Lists" Icon={ClipboardIcon} />
                        <SidebarMenuItem text="Profile" Icon={UserIcon} />
                        <SidebarMenuItem
                            text="More"
                            Icon={DotsCircleHorizontalIcon}
                        />
                    </>
                )}
            </div>
            {/* Button */}
            {session ? (
                <>
                    <button className="bg-blue-400 text-white w-56 rounded-full h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">
                        Tweet
                    </button>
                    {/* Mini-Profile */}
                    <div className="w-full hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
                        <img
                            onClick={signOut}
                            src={session.user.image}
                            className="h-10 w-10 rounded-full object-cover xl:mr-2"
                        />
                        <div className="leading-5 hidden xl:inline">
                            <h4 className="font-bold">{session.user.name}</h4>
                            <p className="text-gray-500">
                                @{session.user.username}
                            </p>
                        </div>
                        <DotsHorizontalIcon className="h-5 ml-auto hidden xl:inline" />
                    </div>
                </>
            ) : (
                <>
                    <button
                        onClick={signIn}
                        className="bg-blue-400 text-white w-36 rounded-full h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline"
                    >
                        Sign in
                    </button>
                    <div className="hoverEffect text-gray-700 flex items-center justify-center xl:hidden mt-auto">
                        <LoginIcon
                            onClick={signIn}
                            className="h-7 w-7 rounded-full object-cover xl:mr-2"
                        />
                    </div>
                </>
            )}
        </div>
    );
}
