import '@/plugins/firebase';

import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';

const auth = getAuth();
auth.languageCode = 'ko';

let recaptchaVerifier = null;
let confirmationResult = null;
let requestPhone = '';

export default {
  makeRecaptchaVerifier(el, cb) {
    recaptchaVerifier = new RecaptchaVerifier(el, {
      size: 'invisible',
      callback: cb,
    }, auth);

    return recaptchaVerifier;
  },
  async resetRecaptchaVerifier() {
    const widgetId = await recaptchaVerifier.render();
    recaptchaVerifier.reset(widgetId);
  },
  async signInWithPhoneNumber(phone) {
    if (phone != null) {
      requestPhone = phone;
    }

    confirmationResult = await signInWithPhoneNumber(auth, requestPhone, recaptchaVerifier);
    return confirmationResult;
  },
  async confirmSignInCode(code) {
    return confirmationResult.confirm(code);
  },
  async signOut() {
    return signOut(auth);
  },
  onAuthStateChanged(cb) {
    onAuthStateChanged(auth, cb);
  },
  async updateProfile(name) {
    await updateProfile(auth.currentUser, {
      displayName: name,
    });
  },
};
