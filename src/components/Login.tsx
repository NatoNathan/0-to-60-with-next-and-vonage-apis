import supabase from 'utils/supabaseClient';
import { useEffect, useState } from 'react';

export const Login = () => {
    const [email, setEmail] = useState<string>();
    const [loading, setLoading] = useState(false);
    const [errMessage, setErrMessage] = useState<string>();
    const [sent, setSent] = useState(false);

    useEffect(()=> {
        setErrMessage(undefined);
    }, [email]);



    const handleLogin = async (email?: string) => {
        setLoading(true);
        setErrMessage(undefined);

        try {
            if (!email) throw new Error('Email must not be empty');
            const { error } = await supabase.auth.signInWithOtp({ email });
            if (error) throw error;
            setSent(true);
        } catch (err) {
            const message = (err as Error).message;
            console.error(err);
            setErrMessage(message);
            setSent(false);
        } finally {
            setTimeout(()=> setLoading(false),6000);
        }

    };

    return (

        <div className='card w-96 items-center'>
            <div className=' card-body'>
                <div className=' card-title'>
                    Sign In
                </div>

                {!sent && <><div className={`form-control w-96 ${errMessage ? 'text-error': ''}`}>
                    <label className={`input-group ${errMessage ? 'input-error border rounded-lg focus-within:outline outline-error outline-offset-2':''}`}>
                        <span >Email</span>
                        <input type="text" placeholder="info@site.com" onChange={e=> setEmail(e.target.value)} className={`input input-bordered w-full focus:outline-transparent`} />
                    </label>
                    { errMessage && <label className=' label'>
                        <span className=' text-error' >{errMessage}</span>
                    </label>}
                </div>
                    <button className='btn btn-primary btn-block' onClick={e => { e.preventDefault(); handleLogin(email); }} disabled={loading} >Login</button>
                </>}

                {sent && <>
                    <h3>Magic Link sent to {email}, Please check your email</h3>
                    <button className='btn btn-xs btn-error' onClick={e => { e.preventDefault(); setSent(false); }} disabled={loading} >Use a different email</button>
                    <button className='btn btn-primary' onClick={e => { e.preventDefault(); handleLogin(email); }} disabled={loading} >Resend</button>
                </>}

            </div>


        </div>
    );
};