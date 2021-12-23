const Airtable = require('airtable');
require('dotenv').config();
const { API_KEY, BASE } = process.env;

const base = new Airtable({ apiKey: API_KEY}).base(BASE);

console.log(base);