import styles from './Login.module.css';
import supabase from '../utils/supabaseClient';
import { useState } from 'react';

export const Login = () => {
    const [email, setEmail] = useState<string>();
    const [loading, setLoading] =useState(false);
    const [errMessage, setErrMessage] = useState<string>();

    const handleLogin = async (email?:string) => {
        setLoading(true);
        setErrMessage(undefined);
        
        try {
            if (!email) throw new Error('Email must not be empty');
            const {error} = await supabase.auth.signInWithOtp({email});
            if (error) throw error;
        } catch (err) {
            const message = (err as Error).message;
            console.error(err);
            setErrMessage(message);
        } finally {
            setLoading(false);
        }
        
    };

    return (
        <div className={styles.card}>
            <label>
                Email:
                <input  value={email} onChange={e => setEmail(e.target.value)} />
            </label>

            <button onClick={e=> {e.preventDefault(); handleLogin(email);}} disabled={loading} >Login</button>
            
            {errMessage && <small>{errMessage}</small>}


        </div>
    );
};