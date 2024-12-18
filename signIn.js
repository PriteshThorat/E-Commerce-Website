/*const signinEmail = document.getElementById("signin-email");
const signinPass = document.getElementById("signin-pass");
const signinVerify = document.getElementById("signin-verify");

let isEmailCorrect = false;
let isPassCorrect = false;

async function fetchData() {
    try {
      // Replace <BIN_ID>, <BIN_VERSION | latest>, and <YOUR_API_KEY> with your actual values
      const response = await fetch("", {
        method: "GET",
        headers: {
          "X-Master-Key": ""
        }
      });
  
      // Check if the response is OK (status code in the range 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
      }
  
      // Parse the JSON response
      const data = await response.json();
      signinVerification(signinEmail.value, signinPass.value, data.record);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function updateData(newData) {
    try {
      const binId = ""; // Replace with your actual bin ID
      const apiKey = ""; // Replace with your actual API key
  
      const response = await fetch(``, {
        method: "PUT",
        headers: {
          "X-Master-Key": apiKey,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newData) // Convert newData to JSON
      });
  
      // Check if the response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
      }
  
      // Parse the JSON response
      const data = await response.json();
      console.log('Updated Data:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

const signinVerification = (email, pass, tempData) => {
    tempData.users.forEach((data) => {
        if (data.user.email === email) {
            isEmailCorrect = true;
            if (data.user.password === pass) {
                isPassCorrect = true;
                userID = data.userId;

                localStorage.setItem('userID', data.userId);
                data.isLoggedIn = true;
                
                window.location.href = "index.html";
            }
        }

        updateData(tempData);
    });

    if (!isEmailCorrect) {
        alert("Incorrect Email OR Password");
    } else if (!isPassCorrect) {
        alert("Incorrect Password");
    }
};

signinVerify.addEventListener("click", () => {
    fetchData();
    //signinVerification(signinEmail.value, signinPass.value);
});*/