const redirectToHomePage = () => {
    window.location.replace('https://legends.solar');
};

export {redirectToHomePage};

export const EXTERNAL_LINKS = {
    HOME: 'https://legends.solar',
    TEAM: {
        NERA: 'https://www.legends.solar/team-members/nera',
    },
    PAGES: {
        ABOUT_US: 'https://www.legends.solar/about-legends',
        TEAM: 'https://www.legends.solar/the-team',
        LEARN: 'https://www.legends.solar/reserve-panels',
        HOW_IT_WORKS: 'https://www.legends.solar/how-it-works',
        FAQS: 'https://www.legends.solar/faqs',
        NEWS_ROOM: 'https://www.legends.solar/news-room',
    },
    CONNECT: {
        TWITTER: 'https://twitter.com/legends_solar',
        INSTAGRAM: 'https://www.instagram.com/legends.solar/',
        LINKED_IN: 'https://www.linkedin.com/company/legendssolar/',
    },
    LEGAL: {
        PRIVACY_POLICY: 'https://www.legends.solar/legal/privacy-policy',
        TERMS_AND_CONDITIONS:
            'https://www.legends.solar/legal/terms-and-conditions',
        DISCLAIMER: 'https://www.legends.solar/legal/legal',
    },
    MAILTO: {
        NERA: "mailto:nera@letsBeLegends.com?subject=Let's%20be%20Legends",
    },
};
