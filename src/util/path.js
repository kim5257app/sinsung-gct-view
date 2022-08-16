export default {
  apiHost: (() => ((process.env.NODE_ENV === 'production')
    ? 'https://veni.koreacentral.cloudapp.azure.com'
    : 'http://localhost:4000'))(),
};
