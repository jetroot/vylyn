import Link from "next/link";

const Error404 = () => {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <h1 className="text-9xl text-typography-body-dark animate-bounce">
                404
            </h1>
            <p className="text-center text-white text-sm">
                We couldn't find the page that you're looking for!
            </p>

            <Link href={"/"}>
                <div className="bg-slate-300 p-2 rounded-md my-8">Go back to home</div>
            </Link>
        </div>
    );
};

export default Error404;
