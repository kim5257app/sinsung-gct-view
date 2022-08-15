import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const auth = getAuth();
auth.languageCode = 'it';

export default {
  makeRecaptchaVerifier(el, cb) {
    return new RecaptchaVerifier(el, {
      size: 'invisible',
      callback: cb,
    }, auth);
  },
  async resetRecaptchaVerifier(recaptchaVerifier) {
    const widgetId = await recaptchaVerifier.render();
    recaptchaVerifier.reset(widgetId);
  },
  async signInWithPhoneNumber(recaptchaVerifier, phone) {
    return signInWithPhoneNumber(auth, phone, recaptchaVerifier);
  },
  async confirmSignInCode(confirmationResult, code) {
    return confirmationResult.confirm(code);
  },
};
