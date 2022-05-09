import {useEffect, useRef, useState} from 'react';
import {useAuth} from 'hooks/use_auth';

const RecaptchaVerifier = (captchaComplete) => {
    const {getRecaptchaVerifier} = useAuth();
    const captchaRef = useRef(null);
    const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);

    const captchaCompleteCallback = (resp) => {
        console.log('complete');
        console.log(resp);
        captchaComplete(recaptchaVerifier);
    };

    useEffect(() => {
        console.log('get recaptcha');
        const recaptcha = getRecaptchaVerifier(
            captchaRef.current,
            captchaCompleteCallback,
        );

        recaptcha.verify();

        setRecaptchaVerifier(recaptcha);
    }, []);

    return <div id="2fa-captcha" ref={captchaRef}></div>;
};

export default RecaptchaVerifier;
