const Airtable = require('airtable');
require('dotenv').config();
const { API_KEY, BASE } = process.env;

const base = new Airtable({ apiKey: API_KEY}).base(BASE);

base('Maps')
    .select({})
    .eachPage((records, next) => {
        records.forEach(record => console.log(record.fields));
        next();
    })
    .catch(err => console.log(err));
