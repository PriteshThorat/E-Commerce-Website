/*const num1 = document.getElementById("1-number").value;
const num2 = document.getElementById("2-number").value;
const num3 = document.getElementById("3-number").value;
const num4 = document.getElementById("4-number").value;
const num5 = document.getElementById("5-number").value;
const num6 = document.getElementById("6-number").value;
const verifyBtn = document.getElementById("verify-btn");
const cancel = document.getElementById("cancel");

const emptyData = () => {
    if (num1.trim() === "") {
        return 0;
    }
    if (num2.trim() === "") {
        return 0;
    }
    if (num3.trim() === "") {
        return 0;
    }
    if (num4.trim() === "") {
        return 0;
    }
    if (num5.trim() === "") {
        return 0;
    }
    if (num6.trim() === "") {
        return 0;
    }
    return 1;
};

const fullOTPValue = () => {
    const otp = `${num1}${num2}${num3}${num4}${num5}${num6}`
    return otp;
};

const checkOTP = (otp, input) => {
    if (otp !== input) {
        alert("Incorrect OTP!");
        return 1;
    }
};

const clear = () => {
    num1.value = "";
    num2.value = "";
    num3.value = "";
    num4.value = "";
    num5.value = "";
    num6.value = "";
};

verifyBtn.addEventListener("click", () => {
    if (!emptyData) {
        alert("Enter OTP");
        return;
    }
    const otp = JSON.parse(localStorage.getItem('OTP'));
    checkOTP(otp, fullOTPValue());
    
    if (checkOTP()) {
        clear();
        return;
    }

    const url = JSON.parse(localStorage.getItem('url'));
    window.location.href = `${url}`;
})*/