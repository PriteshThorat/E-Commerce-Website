/*const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const otpBtn = document.getElementById("otp-btn");

let firstNameValue;
let lastNameValue;
let emailValue;
let passwordValue;

let otpValue;

import config from './config';

const emptyData = () => {
    firstNameValue = firstName.value;
    lastNameValue = lastName.value;
    emailValue = email.value;
    passwordValue = password.value;

    if (firstNameValue.trim() === "") {
        alert("Enter your First Name");
        return 0;
    }
    if (lastNameValue.trim() === "") {
        alert("Enter your Last Name");
        return 0;
    }
    if (emailValue.trim() === "") {
        alert("Enter your Email")
        return 0;
    }
    if (passwordValue.trim() === "") {
        alert("Enter Password");
        return 0;
    }
    return 1;
};

const generateOtp = () => {
    const otp = Math.floor((Math.random() * 1000000) + 1);
    otpValue = otp;
};

emailjs.init("");  // Initialize with your User ID

const sendEmail = () => {
  const templateParams = {
    to_the_email: `${emailValue}`,
    to_email: `${emailValue}`,  // Replace with recipient email
    message: `${otpValue}`
  };

  emailjs.send('', '', templateParams)
    .then(response => {
       console.log('Email sent successfully!', response.status, response.text);
    }, error => {
       console.error('Failed to send email:', error);
    });
};

otpBtn.addEventListener("click", () => {
    if (!emptyData()) {
        return;
    }
    generateOtp();

    sendEmail();
    localStorage.setItem('OTP', `${otpValue}`);

    localStorage.setItem('url', 'signUp.html');
    setTimeout(() => {
        //window.location.href = "otpVer.html";
      }, 100); // Delay in milliseconds
});*/