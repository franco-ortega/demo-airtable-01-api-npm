const Airtable = require('airtable');
require('dotenv').config();
const { API_KEY, BASE } = process.env;

const base = new Airtable({ apiKey: API_KEY}).base(BASE);
const MAPS = 'Maps'

// Retrieve all the records in this database
base('Maps')
    .select({})
    .eachPage((records, next) => {
        console.log('////////////// START: All Records //////////////');
        records.forEach(record => console.log(record.fields));
        console.log('////////////// END: All Records //////////////');
        next();
    })
    .catch(err => console.log(err));


// Retrieve only the Name column - using fields property
base(MAPS)
    .select( { fields: ['Name'], sort: [{ field: 'Name', direction: "asc"}] })
    .eachPage((records, next) => {
        console.log('////////////// START: Name - Mountains //////////////');
        records.forEach(record => console.log(record.fields));
        console.log('////////////// END: Name //////////////');
    })
    .catch(err => console.log(err));


// Sort by Name - using sort property
base(MAPS)
    .select( { sort: [{ field: 'Name', direction: "asc"}] })
    .eachPage((records, next) => {
        console.log('////////////// SORT START: Name //////////////');
        records.forEach(record => console.log(record.fields));
        console.log('************** SORT END **************');
    })
    .catch(err => console.log(err));


// Sort by Start Date - using sort property
base(MAPS)
    .select( { sort: [{ field: 'Start Date', direction: "desc"}] })
    .eachPage((records, next) => {
        console.log('////////////// SORT START: Start Date //////////////');
        records.forEach(record => console.log(record.fields));
        console.log('************** SORT END **************');
    })    .catch(err => console.log(err));


// Filter by formula - using filterByFormula property to get items with the name of Mountains
base('Maps')
    .select({ filterByFormula: "({Name} = 'Mountains')"})
    .eachPage((records, next) => {
        console.log('////////////// FILTER BY FORMULA START: Name //////////////');
        records.forEach(record => console.log(record.fields));
        next();
    })
    .catch(err => console.log(err));


// Filter by formula - using filterByFormula property to get items with a price above 10
base('Maps')
    .select({ filterByFormula: "({Price} > '10')"})
    .eachPage((records, next) => {
        console.log('////////////// FILTER BY FORMULA START: Price > 10 //////////////');
        records.forEach(record => console.log(record.fields));
        next();
    })
    .catch(err => console.log(err));

