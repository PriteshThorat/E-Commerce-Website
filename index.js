require('dotenv').config();

//console.log('Environment Variables:', process.env); // Log all env variables
const mySecret = process.env.MY_SECRET;
console.log(`My secret is: ${mySecret}`);
