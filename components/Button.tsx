import { ReactNode, MouseEventHandler, CSSProperties } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type Props = {
    className?: string;
    children?: ReactNode;
    disabled?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    icon?: ReactNode;
    loading?: boolean;
    loadingCentered?: boolean;
    shadow?: boolean;
    type?:
        | "primary"
        | "default"
        | "secondary"
        | "alternative"
        | "outline"
        | "dashed"
        | "link"
        | "text"
        | "danger"
        | "warning";
    htmlType?: "button" | "submit" | "reset";
    // size?: "tiny" | "small" | "medium" | "large" | "xlarge";
    style?: CSSProperties;
};

const Button = ({
    className,
    children,
    disabled,
    onClick,
    icon,
    loading,
    style,
    htmlType = "button",
}: Props) => {
    return (
        <button
            type={htmlType}
            style={style}
            className={`${
                disabled ? "cursor-not-allowed" : ""
            } relative cursor-pointer items-center space-x-2 text-center font-regular rounded outline-none outline-0 shadow-sm text-sm leading-4 px-3 py-2 ${className}`}
            onClick={disabled ? () => {} : onClick}
        >
            <span className="w-full flex gap-1">
                {loading ? (
                    <AiOutlineLoading3Quarters />
                ) : icon && !loading ? (
                    icon
                ) : (
                    ""
                )}
                {children}
            </span>
        </button>
    );
};

export default Button;
