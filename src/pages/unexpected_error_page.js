import {whiteHaze} from 'static/colors';
import LegendsLogoDark from 'components/icons/legends_logo_dark';

const UnexpectedErrorPage = () => {
    return (
        <div
            style={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: whiteHaze,
            }}
        >
            <div
                style={{
                    marginTop: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}
            >
                <LegendsLogoDark></LegendsLogoDark>
                <div>An unexpected error has occured. </div>
                <div>
                    Try reloading the page, but if this issue persists, contact:
                </div>
                <a href="mailto: support@letsbelegends.com">
                    support@letsbelegends.com
                </a>
            </div>
        </div>
    );
};

export default UnexpectedErrorPage;
