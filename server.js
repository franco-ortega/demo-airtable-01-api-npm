const Airtable = require('airtable');
require('dotenv').config();
const { API_KEY, BASE } = process.env;

const base = new Airtable({ apiKey: API_KEY}).base(BASE);
const MAPS = 'Maps';

// Retrieve all the records in this database
base(MAPS)
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
base(MAPS)
    .select({ filterByFormula: "({Name} = 'Mountains')"})
    .eachPage((records, next) => {
        console.log('////////////// FILTER BY FORMULA START: Name //////////////');
        records.forEach(record => console.log(record.fields));
        next();
    })
    .catch(err => console.log(err));


// Filter by formula - using filterByFormula property to get items with a price above 10
base(MAPS)
    .select({ filterByFormula: "({Price} > '10')"})
    .eachPage((records, next) => {
        console.log('////////////// FILTER BY FORMULA START: Price > 10 //////////////');
        records.forEach(record => console.log(record.fields));
        next();
    })
    .catch(err => console.log(err));


// Retrieve all the records in this database and order based on view in the table
base(MAPS)
    .select({ view: 'Grid view'})
    .eachPage((records, next) => {
        console.log('////////////// START: View - Grid View //////////////');
        records.forEach(record => console.log(record.fields));
        console.log('////////////// END: View - Grid View //////////////');
        next();
    })
    .catch(err => console.log(err));


// Create a new record
base(MAPS).create([
    {
      "fields": {
        "Name": "Valley",
        "Priority": "Low",
        "Status": "Done",
        "Start Date": "2021-12-05",
        "Deadline": "2021-12-25",
        "Cost": 2,
        "Price": 6
      }
    }
]);
