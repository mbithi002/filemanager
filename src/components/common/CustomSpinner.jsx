import React from 'react'

function CustomSpinner({bg='gray-200', border='black'}) {
    return (
        <div className={`w-full h-full flex flex-col items-center justify-center content-center bg-${bg} bg-opacity-10`}>
            <div className={`w-[3rem] h-[3rem] border-[.3rem] border-${border} border-t-[transparent] animate-spin rounded-[1.5rem]`}></div>
        </div>
    )
}

export default CustomSpinner