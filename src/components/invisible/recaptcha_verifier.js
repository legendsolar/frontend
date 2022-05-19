import {useEffect, useRef, useState} from 'react';
import {useAuth} from 'hooks/use_auth';

const RecaptchaVerifier = ({captchaComplete}) => {
    const {getRecaptchaVerifier} = useAuth();
    const captchaRef = useRef(null);
    const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
    const [captchaVerified, setCaptchaVerified] = useState(false);

    const captchaCompleteCallback = (resp) => {
        setCaptchaVerified(true);
    };

    useEffect(() => {
        const recaptcha = getRecaptchaVerifier(
            captchaRef.current,
            captchaCompleteCallback,
        );

        setRecaptchaVerifier(recaptcha);

        recaptcha.verify();
    }, []);

    useEffect(() => {
        if (captchaVerified && recaptchaVerifier) {
            captchaComplete(recaptchaVerifier);
        }
    }, [captchaVerified, recaptchaVerifier]);

    return <div id="2fa-captcha" ref={captchaRef}></div>;
};

export default RecaptchaVerifier;
