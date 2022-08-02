import Head from "next/head";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";

export default function Home({ newsResults }) {
    return (
        <div>
            <Head>
                <title>Twitter Clone</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex min-h-screen max-w-7xl mx-auto">
                {/* Sidebar */}
                <Sidebar />

                {/* Feed */}
                <Feed />

                {/* Widgets */}
                <Widgets newsResults={newsResults} />

                {/* Modal */}
            </main>
        </div>
    );
}

// https://newsapi.org/v2/top-headlines?sources=mashable&apiKey=f0df678708d74cafb2d72fc9882ee497

export async function getServerSideProps() {
    const newsResults = await (
        await fetch(
            "https://newsapi.org/v2/top-headlines?sources=mashable&apiKey=f0df678708d74cafb2d72fc9882ee497"
        )
    ).json();

    return {
        props: {
            newsResults: newsResults.articles,
        },
    };
}
