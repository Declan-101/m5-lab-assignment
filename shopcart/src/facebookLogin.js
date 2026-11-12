const appId = process.env.REACT_APP_FACEBOOK_APP_ID;
const version = process.env.REACT_APP_FACEBOOK_GRAPH_VERSION || "v24.0";
let sdkPromise;

function loadFacebookSdk() {
  if (!appId) {
    return Promise.reject(new Error("Facebook login needs an App ID in .env.local."));
  }
  if (window.location.protocol !== "https:") {
    return Promise.reject(new Error("Open the app over HTTPS to use Facebook login."));
  }
  if (sdkPromise) return sdkPromise;

  sdkPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    let timer;

    function fail() {
      window.clearTimeout(timer);
      script.remove();
      sdkPromise = undefined;
      reject(new Error("Facebook could not load. Check your connection and try again."));
    }

    window.fbAsyncInit = () => {
      try {
        window.FB.init({ appId, version, cookie: false, xfbml: false, fedCM: false });
        window.clearTimeout(timer);
        resolve(window.FB);
      } catch (error) {
        fail();
      }
    };
    script.id = "facebook-jssdk";
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.onerror = fail;
    timer = window.setTimeout(fail, 15000);
    document.head.appendChild(script);
  });
  return sdkPromise;
}

export function prepareFacebookLogin() {
  return loadFacebookSdk();
}

export function signInWithFacebook() {
  const sdk = window.FB;
  if (!sdk) return Promise.reject(new Error("Facebook is still loading. Please try again."));

  return new Promise((resolve, reject) => {
    // Invoke login directly from the button gesture so browsers allow the popup.
    sdk.login(response => {
      if (!response.authResponse?.accessToken) {
        reject(new Error("Facebook sign-in was cancelled or did not complete."));
        return;
      }
      sdk.api("/me", { fields: "id,name,picture" }, profile => {
        if (profile.error || !profile.id) {
          reject(new Error("Facebook could not return your profile. Please try again."));
          return;
        }
        resolve({
          name: profile.name,
          picture: profile.picture?.data?.url,
          provider: "Facebook"
        });
      });
    }, { scope: "public_profile" });
  });
}
