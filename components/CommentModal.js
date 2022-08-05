import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atom/modalAtom";
import Modal from "react-modal";
import {
    XIcon,
    XCircleIcon,
    PhotographIcon,
    EmojiHappyIcon,
    DotsHorizontalIcon,
} from "@heroicons/react/outline";
import Moment from "react-moment";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function CommentModal() {
    const [open, setOpen] = useRecoilState(modalState);
    const [post] = useRecoilState(postIdState);
    const [input, setInput] = useState("");
    const { data: session } = useSession();

    const sendComment = async () => {};

    return (
        <div>
            {open && (
                <Modal
                    className="max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2  border-gray-200 rounded-xl shadow-md outline-none"
                    isOpen={open}
                    onRequestClose={() => setOpen(false)}
                >
                    <div className="p-1">
                        <div className="border-b border-gray-200 py-2 px-1.5">
                            <div
                                onClick={() => setOpen(false)}
                                className="hoverEffect w-9 h-9 flex items-center justify-center"
                            >
                                <XIcon className="h-[22px] text-gray-700" />
                            </div>
                        </div>
                        <div className="p-2 flex flex-wrap items-center space-x-1 relative">
                            <span className="w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300" />
                            <img
                                className="h-11 w-11 rounded-full object-cover mr-4"
                                src={post.userImg}
                                alt={post.name}
                            />
                            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                                {post.name}
                            </h4>
                            <span className="text-sm sm:text-[15px]">
                                @{post.username} -{" "}
                            </span>
                            <span className="text-sm sm:text-[15px] hover:underline">
                                <Moment fromNow>
                                    {post.timestamp.toDate()}
                                </Moment>
                            </span>
                        </div>

                        <p className="text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2">
                            {post.text}
                        </p>

                        <div className="flex p-3 space-x-3">
                            <img
                                className="h-11 w-11 object-cover rounded-full cursor-pointer hover:brightness-95"
                                src={session.user.image}
                            />
                            <div className="w-full divide-y divide-gray-200">
                                <div className="">
                                    <textarea
                                        className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[100px] text-gray-700"
                                        rows="2"
                                        placeholder="Tweet your reply"
                                        onChange={(e) =>
                                            setInput(e.target.value)
                                        }
                                        value={input}
                                    ></textarea>
                                </div>
                                <div className="flex items-center justify-between pt-2.5">
                                    <div className="flex items-center">
                                        <div>
                                            <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                                        </div>
                                        <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                                    </div>
                                    <button
                                        className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 cursor-pointer disabled:opacity-50"
                                        disabled={!input.trim()}
                                        onClick={sendComment}
                                    >
                                        Reply
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}
