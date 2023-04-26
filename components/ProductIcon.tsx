import Image from "next/image";

interface ProductIcon {
    icon: string;
}

function ProductIcon({ icon }: ProductIcon) {
    return (
        <div
            className={
                "flex h-8 w-8 items-center justify-center rounded-md bg-gray-50"
            }
        >
            <Image 
                src={icon}
                width={26}
                height={26}
                alt={'vylyn feature icon'}
            />
        </div>
    );
}

export default ProductIcon;
