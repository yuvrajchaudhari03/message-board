
export default function InputElement({
    placeholder,
    onChange,
    value
}) {

    return (
        <textarea
            type="text"
            className="w-full md:w-2/6 border p-2 rounded-xl focus:outline-none focus:border-[#000]"
            placeholder={placeholder}
            onChange={onChange}
            value={value}
        />
    )
}