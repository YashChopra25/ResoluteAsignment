import React from 'react'
import LoaderImg from "../assets/loader.svg"

const Loader = () => {
    return (
        <section className="bg-gray-50 dark:bg-gray-900">

            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 md:h-[86vh]">
                <img src={LoaderImg} alt="Loading" />

            </div>
        </section>
    )
}

export default Loader