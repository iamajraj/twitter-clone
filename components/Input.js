/* eslint-disable @next/next/no-img-element */
import {
    PhotographIcon,
    EmojiHappyIcon,
    XCircleIcon,
} from "@heroicons/react/outline";
import { useSession, signOut } from "next-auth/react";
import { useRef, useState } from "react";
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

export default function Input() {
    const { data: session } = useSession();
    const [input, setInput] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const filePickerRef = useRef(null);

    const sendPost = async (e) => {
        if (loading) return;
        setLoading(true);
        console.log("post");
        const docRef = await addDoc(collection(db, "posts"), {
            id: session.user.uid,
            text: input,
            userImg: session.user.image,
            timestamp: serverTimestamp(),
            name: session.user.name,
            username: session.user.username,
        });

        const imageRef = ref(storage, `posts/${docRef.id}/image`);

        if (selectedFile) {
            await uploadString(imageRef, selectedFile, "data_url").then(
                async () => {
                    const downloadURL = await getDownloadURL(imageRef);
                    await updateDoc(doc(db, "posts", docRef.id), {
                        image: downloadURL,
                    });
                }
            );
        }

        setInput("");
        setSelectedFile(null);
        setLoading(false);
    };

    const addImageToPost = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result);
        };
    };

    return (
        <>
            {session && (
                <div className="flex border-b border-gray-200 p-3 space-x-3">
                    <img
                        onClick={signOut}
                        className="h-11 w-11 object-cover rounded-full cursor-pointer hover:brightness-95"
                        src={session.user.image}
                        alt="user-image"
                    />
                    <div className="w-full divide-y divide-gray-200">
                        <div className="">
                            <textarea
                                className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[100px] text-gray-700"
                                rows="2"
                                placeholder="What's happening?"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            ></textarea>
                        </div>
                        {selectedFile && (
                            <div className="relative">
                                <XCircleIcon
                                    className="absolute h-8 text-red-500 cursor-pointer"
                                    onClick={() => setSelectedFile(null)}
                                />
                                <img
                                    className={`rounded-lg ${
                                        loading && "animate-pulse"
                                    }`}
                                    src={selectedFile}
                                    alt="preview image"
                                />
                            </div>
                        )}
                        <div className="flex items-center justify-between pt-2.5">
                            {!loading && (
                                <>
                                    <div className="flex items-center">
                                        <div
                                            onClick={() =>
                                                filePickerRef.current.click()
                                            }
                                        >
                                            <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                                            <input
                                                ref={filePickerRef}
                                                type="file"
                                                hidden
                                                onChange={addImageToPost}
                                            />
                                        </div>
                                        <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                                    </div>
                                    <button
                                        onClick={sendPost}
                                        className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 cursor-pointer disabled:opacity-50"
                                        disabled={!input.trim()}
                                    >
                                        Tweet
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
