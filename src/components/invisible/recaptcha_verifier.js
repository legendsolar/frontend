import {useEffect, useRef, useState} from 'react';
import {useAuth} from 'hooks/use_auth';

const RecaptchaVerifier = (captchaComplete) => {
    const {getRecaptchaVerifier} = useAuth();
    const captchaRef = useRef(null);
    const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);

    const captchaCompleteCallback = (resp) => {
        console.log('complete');
        console.log(resp);
        captchaComplete(resp);
    };

    useEffect(() => {
        console.log('get recaptcha');
        setRecaptchaVerifier(
            getRecaptchaVerifier(captchaRef.current, captchaCompleteCallback),
        );
    }, []);

    console.log(recaptchaVerifier);

    return <div id="2fa-captcha" ref={captchaRef}></div>;
};

export default RecaptchaVerifier;
