import {useEffect, useRef, useState} from 'react';
import {useAuth} from '@project/hooks/use_auth';
import {RecaptchaVerifier as FirebaseRecaptchaVerifier} from 'firebase/auth';

/**
 * Component to load a recaptcha verifier. Verifies on load
 * @param {*} param0
 * @returns
 */
export const RecaptchaVerifier = ({captchaComplete}) => {
    const {getRecaptchaVerifier} = useAuth();
    const captchaRef = useRef<HTMLDivElement>(null);
    const [recaptchaVerifier, setRecaptchaVerifier] =
        useState<FirebaseRecaptchaVerifier>();
    const [captchaVerified, setCaptchaVerified] = useState<boolean>(false);

    const captchaCompleteCallback = () => {
        setCaptchaVerified(true);
    };

    useEffect(() => {
        if (captchaRef.current) {
            const recaptcha = getRecaptchaVerifier(
                captchaRef.current,
                captchaCompleteCallback,
            );

            setRecaptchaVerifier(recaptcha);

            recaptcha.verify();

            return () => {
                recaptcha.clear();
            };
        }
    }, []);

    useEffect(() => {
        if (captchaVerified && recaptchaVerifier) {
            captchaComplete(recaptchaVerifier);
        }
    }, [captchaVerified, recaptchaVerifier]);

    return <div id="2fa-captcha" ref={captchaRef}></div>;
};
