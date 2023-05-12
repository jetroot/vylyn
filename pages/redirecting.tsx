import { UserContext } from "@/context";
import { storeUserInLocalStorage } from "@/utils/storage";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";

const redirecting = () => {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const userContext = useContext(UserContext);

    useEffect(() => {
        // const getUserSession = () => {
        //     try {
        //         // Listen for changes in the authentication state
        //         supabase.auth.onAuthStateChange(async (event, session) => {
        //             switch (event) {
        //                 case "SIGNED_IN": {
        //                     setCheckingStatus("Signed In The User");
        //                     console.log(`SIGNED_IN - ${checkingStatus}`);
        //                 }
        //                 case "INITIAL_SESSION": {
        //                     setCheckingStatus("Checking User");
        //                     console.log(`INITIAL_SESSION - ${checkingStatus}`);

        //                     // Get current user session
        //                     const {
        //                         error,
        //                         data: { session },
        //                     } = await supabase.auth.getSession();

        //                     // check for error
        //                     if (error) throw new Error("error");

        //                     // if there is a session
        //                     // redirect user to the dashboard
        //                     if (session) {
        //                         setIsLoading(false);
        //                         setCheckingStatus("redirecting the user");

        //                         console.log(
        //                             `INITIAL_SESSION: IF - ${checkingStatus}`
        //                         );

        //                         router.replace({
        //                             pathname: "/auth",
        //                             query: {
        //                                 tk: session.access_token, // token
        //                                 rt: "auth/dashboard", // redirectTo
        //                             },
        //                         });
        //                     } else {
        //                         setCheckingStatus("redirecting the user");

        //                         console.log(
        //                             `INITIAL_SESSION: Else - ${checkingStatus}`
        //                         );

        //                         router.replace({
        //                             pathname: "/sign-up",
        //                         });
        //                     }

        //                     break;
        //                 }
        //                 default: {
        //                     setCheckingStatus("redirecting the user");
        //                     console.log(`Default - ${checkingStatus}`);
        //                     router.replace({
        //                         pathname: "/sign-up",
        //                     });
        //                     break;
        //                 }
        //             }
        //         });
        //     } catch (error) {
        //         router.replace({
        //             pathname: "/sign-up",
        //         });
        //     }
        // };

        // console.log(status);
        // getUserSession();
        try {
            // Listen for changes in the authentication state
            supabase.auth.onAuthStateChange(async (event, session) => {
                switch (event) {
                    case "SIGNED_IN":
                    case "INITIAL_SESSION": {
                        // Get current user session
                        const {
                            error,
                            data: { session },
                        } = await supabase.auth.getSession();

                        // check for error
                        if (error) throw new Error("error");

                        // if there is a session
                        if (session) {
                            // Get user & store it
                            const user = {
                                id: session.user.id,
                                email: session.user.email,
                                full_name: session.user.user_metadata.full_name,
                                avatar_url:
                                    session.user.user_metadata.avatar_url,
                            };
                            userContext.setUser(user);
                            storeUserInLocalStorage(user);

                            setIsLoading(false);

                            // redirect user to the dashboard
                            router.replace({
                                pathname: "/auth",
                                query: {
                                    tk: session.access_token, // token
                                    rt: "auth/dashboard", // redirectTo
                                },
                            });
                        } else {
                            router.replace({
                                pathname: "/sign-up",
                            });
                        }

                        break;
                    }
                    default: {
                        router.replace({
                            pathname: "/sign-up",
                        });
                        break;
                    }
                }
            });
        } catch (error) {
            router.replace({
                pathname: "/sign-up",
            });
        }
    }, []);

    return (
        <div className="bg-primary-background text-center w-screen h-screen overflow-hidden flex justify-center items-center">
            <div className="flex flex-col items-center gap-y-3">
                <div className="flex gap-2 items-center">
                    <ImSpinner2
                        className="animate-spin text-slate-400"
                        size={18}
                    />
                    {isLoading && (
                        <p className="text-sm text-slate-400">Redirecting...</p>
                    )}
                </div>
                {!isLoading && (
                    <span className="text-[14px] text-slate-400">
                        Please stand by while we redirect you to the dashboard.
                    </span>
                )}
            </div>
        </div>
    );
};

export default redirecting;
