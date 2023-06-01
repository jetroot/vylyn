import { useState, useEffect } from "react";
import Logo from "../Logo";
import Image from "next/image";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { BsLightningCharge } from "react-icons/bs";

const AuthNav = ({ user }: any) => {
    const [open, setOpen] = useState(false);
    const [isSignInOut, setIsSignInOut] = useState(false);
    const router = useRouter();

    const signout = async () => {
        setOpen(false);
        setIsSignInOut(true);
        await signOut();
    };

    useEffect(() => {
      router.events.on("routeChangeComplete", () => {
          setIsSignInOut(false);
      });
    }, [])

    return (
        <nav className="border-[#282828] border-b bg-primary-background transition-opacity">
            {isSignInOut && (
                <div className="overflow-hidden w-screen">
                    <div className="bg-brandPaltte-400 h-[3px] w-1/2 animate-wiggle"></div>
                </div>
            )}
            <div className="w-full p-4 flex items-center justify-between">
                <Logo />
                <div className="flex justify-between gap-x-2 max-w-[140px] w-full">
                    <div className="text-sm flex items-center">
                        <div className="capitalize flex items-center gap-[2px] text-[12px] text-brandPaltte-500">
                            <BsLightningCharge />
                            {user.plan ? user.plan : "upgrade"}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div
                            onClick={() => setOpen(!open)}
                            className={`cursor-pointer h-8 w-8 rounded-full border-2 border-alt-background overflow-hidden`}
                        >
                            <Image
                                src={user?.image}
                                width={32}
                                height={32}
                                alt="profile image"
                            />
                        </div>

                        {open && (
                            <div className="absolute z-10 max-md w-32 right-4 top-16 bg-alt-background rounded-md flex flex-col">
                                <p className="hover:bg-[#424242] w-full p-2 text-[13px] text-typography-body-dark">
                                    {user.name}
                                </p>
                                <div
                                    onClick={signout}
                                    className="text-typography-body-darki cursor-pointer text-[13px] text-left text-typography-body-dark hover:bg-[#424242] w-full p-2 text-sm"
                                >
                                    Sign Out
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default AuthNav;
