import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import supabase from "utils/supabaseClient";

const useAuthSession = () => {
    const [session, setSession] = useState<Session>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let mounted = true;

        (async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (mounted) {
                if (session) {
                    setSession(session);
                }
            }

            setIsLoading(false);
        })();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session ?? undefined);
            }
        );
        return () => {
            mounted = false;

            subscription.unsubscribe();
        };

    }, []);


    return {
        authSession: session,
        authIsLoading: isLoading
    };

};

export default useAuthSession;