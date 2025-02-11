import { V_CONNECT_CSP_SRC } from 'utils/constants/envVarConstants';

const STYLE_CSP_URL = `https://fonts.googleapis.com`;
const FONT_CSP_URL = `https://fonts.gstatic.com`;

const createCSPMetaTag = () => {
    const cspContent = `default-src 'self'; 
                        script-src 'self'; 
                        style-src 'self' 'unsafe-inline' ${STYLE_CSP_URL}; 
                        connect-src 'self' ${V_CONNECT_CSP_SRC || null}; 
                        font-src 'self' ${FONT_CSP_URL}; 
                        child-src 'self'; 
                        frame-src 'self'; 
                        img-src 'self' data: https://s3.us-east-1.amazonaws.com/anr-ia-backend-dev/;`;

    const metaTag = document.createElement('meta');
    metaTag.httpEquiv = 'Content-Security-Policy';
    metaTag.content = cspContent;

    document.head.appendChild(metaTag);
};

createCSPMetaTag();
