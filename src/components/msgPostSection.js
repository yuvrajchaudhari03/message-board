import ApiCall from "@/app/utils/Apicall";
import InputElement from "./inputElement";
import { useState } from "react"
import { toast } from 'react-toastify';
import Constants from "@/app/utils/Constant";

export default function MsgPostSection({
    onPostMsg,
    setShowAlert
}) {

    const [message, setMessage] = useState('')
    function onChangeMessage(e) {
        setMessage(e.target.value)
    }

    return (
        <>
            <InputElement
                placeholder="Type here..."
                onChange={onChangeMessage}
                value={message}
            />
            <div className="flex gap-4">
                <button className="border border-[#000] p-2 px-4 rounded-xl" onClick={() => onPostMsg(message, setMessage)}>Post!</button>
                <button className="text-red01 border border-[#000] p-2 px-4 rounded-xl" onClick={() => setShowAlert(true)}>Delete All</button>
            </div>
        </>
    )
}