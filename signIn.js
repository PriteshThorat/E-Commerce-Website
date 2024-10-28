const signinEmail = document.getElementById("signin-email");
const signinPass = document.getElementById("signin-pass");
const signinVerify = document.getElementById("signin-verify");

const signinVerification = (email, pass) => {
    console.log(email, pass);
};

signinVerify.addEventListener("click", () => {
    signinVerification(signinEmail.value, signinPass.value);
});

fetch('http://localhost:3000/api/secret') // Ensure this URL is correct
    .then(response => {
        if (!response.ok) { // Check if the response is okay
            throw new Error('Network response was not ok');
        }
        return response.text(); // Parse as text instead of JSON
    })
    .then(data => {
        console.log('My Secret:', data); // Log the plain text secret
    })
    .catch(error => {
        console.error('Error fetching secret:', error); // Log any errors
    });