import { RiGoogleFill } from "react-icons/ri";

const SignUpWithGoogle = () => {
    return (
        <button
            type="button"
            className="flex justify-center items-center gap-3 text-typography-body-dark rounded-md cursor-pointer text-center bg-alt-background px-4 py-2 outline-none w-full"
        >
            <span>
                <RiGoogleFill size={18} />
            </span>
            Sign up with Google
        </button>
    );
};

export default SignUpWithGoogle;
