import Head from "next/head";
import CommentModal from "../components/CommentModal";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";

export default function Home({ newsResults, randomUsersResults }) {
    return (
        <div>
            <Head>
                <title>Twitter Clone</title>
                <meta name="description" content="Twitter clone" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex min-h-screen max-w-7xl mx-auto">
                {/* Sidebar */}
                <Sidebar />

                {/* Feed */}
                <Feed />

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

// https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=

export async function getServerSideProps() {
    const newsResults = await (
        await fetch(
            "https://saurav.tech/NewsAPI/top-headlines/category/technology/in.json"
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
