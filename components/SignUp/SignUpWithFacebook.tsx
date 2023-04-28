import { RiFacebookFill } from "react-icons/ri";

const SignUpWithFacebook = () => {
    return (
        <button
            type="button"
            className="flex justify-center items-center gap-3 text-typography-body-dark rounded-md cursor-pointer text-center bg-alt-background px-4 py-2 outline-none w-full"
        >
            <span>
                <RiFacebookFill size={18} />
            </span>
            Sign up with Facebook
        </button>
    );
};

export default SignUpWithFacebook;
