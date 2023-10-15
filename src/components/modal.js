function Modal({
    children,
    shown,
    close,
    modalClasses,
    modalStyle,
    no_close_icon,
}) {
    // 'Modal' is used in -
    // - for procurement_modal
    // - for 3d_details_modal
    // - to show all the images and videos everywhere
    // - in the 3D measurements desc.
    // - in pls save the design modal

    // Everywhere else 'StandardModal' is used.

    // Difference is only in UI -
    // in 'Modal' - only the outer-wrapper UI is fixed, everything else needs to be styled for each modal separately
    // in 'StandardModal'- modal_title, modal_close btn are fixed in their UI
    console.log(shown)
    return shown ? (
        <div
            className="modal-backdrop !z-[20] pt-14"
            onClick={() => {
                // close modal when outside of modal is clicked
                close()
            }}
        >
            <div
                className={`modal-content noScrollbar !z-[20]   overflow-y-scroll rounded-xl p-6 text-sm max-h-[80vh] w-[90%] lg:w-[60%] ${modalClasses ? modalClasses : ''
                    }`}
                style={modalStyle}
                onClick={(e) => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation()
                }}
            >
                {!no_close_icon && (
                    <div className="text-right">
                        <button onClick={close}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </button>
                    </div>
                )}
                {children}
            </div>
        </div>
    ) : null
}

export default Modal
