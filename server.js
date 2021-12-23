const Airtable = require('airtable');
require('dotenv').config();
const { API_KEY, BASE } = process.env;

const base = new Airtable({ apiKey: API_KEY}).base(BASE);
const MAPS = 'Maps';

// Retrieve all the records in this database
base(MAPS)
    .select({})
    .eachPage(function page(records, fetchNextPage) {
        console.log('////////////// START: All Records //////////////');
        records.forEach(record => console.log(record.fields));
        fetchNextPage();
    }, function done(err) {
        if (err) { console.error(err); return; }
    });


// Retrieve only the Name column - using fields property
base(MAPS)
    .select( { fields: ['Name'], sort: [{ field: 'Name', direction: "asc"}] })
    .eachPage(function page(records, fetchNextPage) {
        console.log('////////////// START: Name - Mountains //////////////');
        records.forEach(record => console.log(record.fields));
        fetchNextPage();
    }, function done(err) {
        if (err) { console.error(err); return; }
    });


// Sort by Name - using sort property
base(MAPS)
    .select( { sort: [{ field: 'Name', direction: "asc"}] })
    .eachPage(function page(records, fetchNextPage) {
        console.log('////////////// SORT START: Name //////////////');
        records.forEach(record => console.log(record.fields));
        fetchNextPage();
    }, function done(err) {
        if (err) { console.error(err); return; }
    });


// Sort by Start Date - using sort property
base(MAPS)
    .select( { sort: [{ field: 'Start Date', direction: "desc"}] })
    .eachPage(function page(records, fetchNextPage) {
        console.log('////////////// SORT START: Start Date //////////////');
        records.forEach(record => console.log(record.fields));
        fetchNextPage();
    }, function done(err) {
        if (err) { console.error(err); return; }
    });


// Filter by formula - using filterByFormula property to get items with the name of Mountains
base(MAPS)
    .select({ filterByFormula: "({Name} = 'Mountains')"})
    .eachPage(function page(records, fetchNextPage) {
        console.log('////////////// FILTER BY FORMULA START: Name //////////////');
        records.forEach(record => console.log(record.fields));
        fetchNextPage();
    }, function done(err) {
        if (err) { console.error(err); return; }
    });


// Filter by formula - using filterByFormula property to get items with a price above 10
base(MAPS)
    .select({ filterByFormula: "({Price} > '10')"})
    .eachPage(function page(records, fetchNextPage) {
        console.log('////////////// FILTER BY FORMULA START: Price > 10 //////////////');
        records.forEach(record => console.log(record.fields));
        fetchNextPage();
    }, function done(err) {
        if (err) { console.error(err); return; }
    });


// Retrieve all the records in this database and order based on view in the table
base(MAPS)
    .select({ view: 'Grid view'})
    .eachPage(function page(records, fetchNextPage) {
        console.log('////////////// START: View - Grid View //////////////');
        records.forEach(record => console.log(record.fields));
        console.log('////////////// END: View - Grid View //////////////');
        fetchNextPage();
    }, function done(err) {
        if (err) { console.error(err); return; }
    });


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
], function(err, records) {
    if (err) {
        console.error(err);
        return;
    }
    records.forEach(function (record) {
        console.log('ID:')
        console.log(record.getId());
    });
});


// Retrieve IDs
base(MAPS)
    .select({})
    .eachPage(function page(records, fetchNextPage) {
        console.log('////////////// START: IDs //////////////');
        records.forEach(record => {
            console.log(record.fields)
            console.log(record.getId())
        });
        fetchNextPage();
    }, function done(err) {
        if (err) { console.error(err); return; }
    });


// Update a record
base(MAPS).update([
    {
      "id": "recJAth6qoCcZIUXU",
      "fields": {
        "Name": "Mountains",
        "Priority": "High",
        "Status": "Done",
        "Start Date": "2021-12-15",
        "Deadline": "2021-12-18",
        "Cost": 15,
        "Price": 38
      }
    }
], function(err, records) {
    if (err) {
      console.error(err);
      return;
    }
    records.forEach(function(record) {
      console.log('Start Date of updated record');
      console.log(record.get('Start Date'));
    });
});


// Retrieve name and ID
base(MAPS)
    .select({})
    .eachPage(function page(records, fetchNextPage) {
        console.log('////////////// START: ID and Name //////////////');
        records.forEach(record => {
            console.log({
                id: record.getId(),
                name: record.fields.Name
            })
        });
        fetchNextPage();
    }, function done(err) {
        if (err) { console.error(err); return; }
    });