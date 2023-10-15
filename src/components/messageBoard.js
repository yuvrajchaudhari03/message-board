"use client"
import ApiCall from "@/app/utils/Apicall";
import Constants from "@/app/utils/Constant";
import { useEffect, useRef, useState } from "react"
import { toast } from 'react-toastify';
import MessageCard from "./messageCard";
import Image from "next/image";
import sortIcon from '../../public/assets/sort.png'
import MsgPostSection from "./msgPostSection";
import Modal from "./modal";

const LIMIT = 20

export default function MessageBoard() {
    const [allMessages, setAllMessage] = useState([])
    const [isSortEnabled, setIsSortEnabled] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [limit, setLimit] = useState(LIMIT)

    async function getAllMsgs() {
        try {
            const response = await ApiCall({
                url: Constants.API_ENDPOINTS.GET_MESSAGES,
                method: "GET",
                withToken: true,
            });
            setAllMessage(response.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)))
        } catch (e) {
            toast.error(e.detail)
        }
    }

    useEffect(() => {
        getAllMsgs()
    }, [])

    //to sort by date
    useEffect(() => {
        if (!isSortEnabled) {
            console.log(allMessages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
            let sortedMsgs = allMessages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            setAllMessage([...sortedMsgs])
        } else {
            let sortedMsgs = allMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
            setAllMessage([...sortedMsgs])
        }
    }, [isSortEnabled])



    async function onDeleteAllMsg() {
        // try {
        //     await ApiCall({
        //         url: Constants.API_ENDPOINTS.DELETE_MSG,
        //         method: "DELETE",
        //         withToken: true,
        //     });
        //     setAllMessage([])
        //     toast.success("All messages deleted.")
        // } catch (e) {
        //     toast.error(e.detail)
        // }
        setAllMessage([])
        toast.success("All messages deleted.")
        setShowAlert(false)
    }
    async function onDeleteMsg(msgId) {
        try {
            await ApiCall({
                url: Constants.API_ENDPOINTS.DELETE_MSG + msgId + "/",
                method: "DELETE",
                withToken: true,
            });
            setAllMessage(prev => prev.filter(m => m.id !== msgId))
            toast.success("Message deleted.")
        } catch (e) {
            toast.error(e.detail)
        }
    }

    function fetchNext() {
        setLimit(prev => prev + LIMIT)
    }

    async function onPostMsg(message, setMessage) {
        try {
            let body = {
                text: message
            }
            const response = await ApiCall({
                url: Constants.API_ENDPOINTS.GET_MESSAGES,
                body: body,
                method: "POST",
                withToken: true,
            });
            setAllMessage(!isSortEnabled ? [response, ...allMessages] : [...allMessages, response])
            setMessage('')
            toast.success("Message added!!")
        } catch (e) {
            toast.error(e.detail)
        }
    }

    return (
        <div>
            <section>
                <h1 className="text-3xl font-bold">Chatter</h1>
                <div className="text-grey01 my-4">Type something in the box below, then hit "Post"</div>
                <MsgPostSection
                    onPostMsg={onPostMsg}
                    setShowAlert={setShowAlert}
                />
            </section>
            <div className="flex items-center gap-1">
                <button className="mt-2 border p-2 rounded-xl flex" onClick={() => setIsSortEnabled(prev => !prev)}>
                    <span>
                        <Image src={sortIcon} width={25} height={25} className="mr-2" alt="sortIcon" />
                    </span>
                    Sort by date
                </button>

                {isSortEnabled && <div className="rounded-full w-3 h-3 bg-blue01"></div>}
            </div>
            <section className="my-4">
                {allMessages.slice(0, limit)?.map((message, index) => (
                    <MessageCard
                        key={message?.id}
                        msgdata={message}
                        onDeleteMsg={onDeleteMsg}
                        isLast={index === allMessages.slice(0, limit).length - 1}
                        fetchNext={fetchNext}
                    />
                ))}
            </section>

            {showAlert &&
                <Modal
                    shown={showAlert}
                    close={() => setShowAlert(false)}
                >
                    <div>
                        <h1 className="font-bold text-xl"> Are you sure want to delete all messages?</h1>
                        <div className="flex gap-2 justify-end mt-6">
                            <button className="border p-2 px-4 rounded-xl bg-grey01 text-white" onClick={() => setShowAlert(false)}>Cancel</button>
                            <button className="border p-2 px-4 rounded-xl bg-red01 text-white" onClick={onDeleteAllMsg}>Yes</button>
                        </div>
                    </div>
                </Modal>
            }
        </div>
    )
}