const INVALID_LOGIN_CREDENTIALS = "Invalid email or password. Please check your credentials and try again.";
const INVALID_EMAIL = "Invalid email address format. Please enter a valid email address.";
const MISSING_PASSWORD = "Password is required. Please enter your password to continue.";
const EMAIL_ALREADY_EXISTS = "This email address is already in use. Please log in or use a different email to create an account";
const WEAK_PASSWORD = "Password should be at least 6 characters long.";
const NO_AVATAR_SELECTED = "Please make sure to select a profile image.";
const TOO_MANY_REQUESTS = "Too many requests in a short period of time. Please wait a few seconds.";

export function errorMessage(mess) {
    let errMessage = null;

    switch(mess) {
        case "auth/invalid-email":
            errMessage = INVALID_EMAIL;
            break;
        case "auth/invalid-login-credentials":
            errMessage = INVALID_LOGIN_CREDENTIALS;
            break;
        case "auth/missing-password":
            errMessage = MISSING_PASSWORD;
            break;
        case "auth/email-already-in-use":
            errMessage = EMAIL_ALREADY_EXISTS;
            break;
        case "auth/weak-password":
            errMessage = WEAK_PASSWORD;
            break;
        case "auth/no-avatar":
            errMessage = NO_AVATAR_SELECTED;
            break;
        case "auth/too-many-requests":
            errMessage = TOO_MANY_REQUESTS;
            break;
    }

    return errMessage;
}
