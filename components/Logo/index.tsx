import Image from "next/image";

type Props = {
    className?: string;
};

const Index = ({ className }: Props) => {
    return (
        <div className={`h-6 ${className}`}>
            <Image
                src="/logo.png"
                alt="vylyn logo"
                className="max-w-full max-h-full"
                width={90}
                height={24}
                priority
            />
        </div>
    );
};

export default Index;
