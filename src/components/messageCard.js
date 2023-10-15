import moment from "moment";
import { useEffect, useRef } from "react";
import MsgIcon from '../../public/assets/msgIcon.png'
import Image from "next/image";

export default function MessageCard({ msgdata, onDeleteMsg, isLast, fetchNext }) {
    const cardRef = useRef()
    useEffect(() => {
        if (!cardRef?.current) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (isLast && entry.isIntersecting) {
                fetchNext()
                observer.unobserve(entry.target);
            }
        });

        observer.observe(cardRef.current);
    }, [isLast]);
    return (
        <div className="py-4 border border-b-0 border-l-0 border-r-0 border-dashed border-grey01" ref={cardRef}>
            <div className="flex gap-2">
                <div>
                    <div className="overflow-hidden w-6">
                        <Image src={MsgIcon} alt="MsgIcon" width={22} height={22} className="mt-1" />
                    </div>
                </div>
                <div>
                    <div className="flex gap-2">
                        <div className="font-bold">~{msgdata?.source}</div>
                        <div className="text-grey01"> {moment(msgdata?.timestamp).format("DD-MM-YY, hh:mm:ss A")}</div>
                        <button className="text-blue01 underline" onClick={() => onDeleteMsg(msgdata?.id)}>Delete</button>
                    </div>
                    <div className="mt-2">
                        <div className="text-grey01">{msgdata?.text}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}