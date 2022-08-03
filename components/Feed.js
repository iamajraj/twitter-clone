import { SparklesIcon } from "@heroicons/react/outline";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Input from "./Input";
import Post from "./Post";

export default function Feed() {
    const [posts, setPosts] = useState([]);
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
                <div className="hoverEffect flex items-center justify-center">
                    <SparklesIcon className="h-5" />
                </div>
            </div>
            <Input />
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
}
