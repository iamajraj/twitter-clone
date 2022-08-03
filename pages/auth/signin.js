/* eslint-disable @next/next/no-img-element */
import { getProviders, signIn } from "next-auth/react";

export default function signin({ providers }) {
    return (
        <div className="flex justify-center mt-20 space-x-4">
            <img
                className="hidden md:inline-flex object-cover md:w-44 md:h-80 rotate-6"
                src="https://cdn.cms-twdigitalassets.com/content/dam/help-twitter/en/twitter-tips/desktop-assets/ch-01/ch12findphone.png.twimg.1920.png"
                alt="twitter image inside a phone"
            />
            <div className="">
                {Object.values(providers).map((provider) => (
                    <div
                        className="flex flex-col items-center"
                        key={provider.id}
                    >
                        <img
                            className="w-36 object-cover"
                            src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
                            alt="twitter logo"
                        />
                        <p className="text-center text-sm italic my-10">
                            This app is created for learning purposes{" "}
                            <b>ONLY</b>
                        </p>
                        <button
                            onClick={()=> signIn(provider.id, {callbackUrl: "/"})}
                            className="bg-blue-400 rounded-lg p-3 text-white hover:bg-blue-500 transition-all duration-200"
                        >
                            Sign in with {provider.name}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    const providers = await getProviders();
    return {
        props: {
            providers,
        },
    };
}
