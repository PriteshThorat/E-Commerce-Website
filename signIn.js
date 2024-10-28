const signinEmail = document.getElementById("signin-email");
const signinPass = document.getElementById("signin-pass");
const signinVerify = document.getElementById("signin-verify");

const signinVerification = (email, pass) => {
    console.log(email, pass);
};

signinVerify.addEventListener("click", () => {
    signinVerification(signinEmail.value, signinPass.value);
});