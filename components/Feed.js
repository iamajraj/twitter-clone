import { SparklesIcon, LogoutIcon, LoginIcon } from "@heroicons/react/outline";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Input from "./Input";
import Post from "./Post";

export default function Feed() {
    const [posts, setPosts] = useState([]);
    const { data: session } = useSession();
    useEffect(
        () =>
            onSnapshot(
                query(collection(db, "posts"), orderBy("timestamp", "desc")),
                (snapshot) => {
                    setPosts(snapshot.docs);
                }
            ),
        []
    );

    return (
        <div className="xl:ml-[290px] border-x border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
            <div className="flex items-center justify-between py-2 px-3 sticky top-0 border-b bg-white z-50 border-gray-200">
                <h2 className="text-lg sm:text-xl font-bold cursor-pointer">
                    Home
                </h2>
                <div className="flex items-center">
                    <div className="hoverEffect flex items-center justify-center">
                        <SparklesIcon className="h-5" />
                    </div>
                    <div>
                        {session ? (
                            <>
                                <div
                                    onClick={signOut}
                                    className="hoverEffect flex items-center justify-center"
                                >
                                    <LogoutIcon className="h-5" />
                                </div>
                            </>
                        ) : (
                            <>
                                <div
                                    onClick={signIn}
                                    className="hoverEffect flex items-center justify-center"
                                >
                                    <LoginIcon className="h-5" />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Input />
            <AnimatePresence>
                {posts.map((post) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <Post id={post.id} post={post} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
