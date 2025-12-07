
export const config = {
  apiBaseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
  auth: {
    authority: process.env.REACT_APP_AUTH_AUTHORITY || 'https://login.microsoftonline.com/common',
    clientId: process.env.REACT_APP_AUTH_CLIENT_ID || 'mock-client-id',
    redirectUri: window.location.origin,
  },
  features: {
    enableGemini: process.env.REACT_APP_ENABLE_AI === 'true',
    enableRealtime: true,
  },
  company: {
    supportEmail: 'helpdesk@wolterskluwer.com',
    legalDisclaimerVersion: '1.0.2',
  }
};
