import webflowHtml from "../scraped/webflow_footer";

const Footer = () => {
    console.log("testing");
    return <div dangerouslySetInnerHTML={{ __html: webflowHtml }}></div>;
};

export default Footer;
