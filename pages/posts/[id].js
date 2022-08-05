import { ChevronLeftIcon } from "@heroicons/react/outline";
import Head from "next/head";
import { useRouter } from "next/router";
import CommentModal from "../../components/CommentModal";
import Sidebar from "../../components/Sidebar";
import Widgets from "../../components/Widgets";
import Post from "../../components/Post";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

export default function PostPage({ newsResults, randomUsersResults }) {
    const Router = useRouter();
    const [post, setPost] = useState();
    const { id } = Router.query;

    useEffect(
        () => onSnapshot(doc(db, "posts", id), (snapshot) => setPost(snapshot)),
        [db, id]
    );

    return (
        <div>
            <Head>
                <title>Post</title>
            </Head>
            <main className="flex min-h-screen max-w-7xl mx-auto">
                {/* Sidebar */}
                <Sidebar />

                {/* Feed */}

                <div className="xl:ml-[290px] border-x border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
                    <div className="flex items-center space-x-2 py-2 px-3 sticky top-0 border-b bg-white z-50 border-gray-200">
                        <div
                            onClick={() => Router.push("/")}
                            className="hoverEffect flex items-center justify-center"
                        >
                            <ChevronLeftIcon className="h-5" />
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">
                            Tweet
                        </h2>
                    </div>
                    <Post id={id} post={post} />
                </div>

                {/* Widgets */}
                <Widgets
                    randomUsersResults={randomUsersResults.results}
                    newsResults={newsResults.articles}
                />

                {/* Modal */}
                <CommentModal />
            </main>
        </div>
    );
}

export async function getServerSideProps() {
    const newsResults = await (
        await fetch(
            "https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=f0df678708d74cafb2d72fc9882ee497"
        )
    ).json();
    let randomUsersResults;
    try {
        // Who to follow section
        randomUsersResults = await fetch(
            "https://randomuser.me/api/?results=30&inc=name,login,picture"
        ).then((res) => res.json());
    } catch (ex) {
        console.log(ex);
    }
    return {
        props: {
            newsResults,
            randomUsersResults: randomUsersResults ?? null,
        },
    };
}
