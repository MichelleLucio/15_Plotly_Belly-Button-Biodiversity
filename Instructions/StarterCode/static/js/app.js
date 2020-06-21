// Fetch the JSON data and console log it
const config = require('./samples.json')


const data = { miche: 'samples' };

fetch('https://samples.com/profile', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});







// let myRequest = new Request ("samples.json");

// // fetch(myRequest)
// //   .then(function(response){
// //     return response.json();
// //   })
// //   .then (function(myData){
// //     console.log(myData);
// //   });


// d3.json(myRequest).then((data) => {
//   console.log(data)
// });




//d3.json("samples/samples.json").then(importedData => {
    //console.log(importedData);
    //let data = importedData;
  //});


// Initializes the page with a default plot
//function init() {
   // data = [{
      //x: [1, 2, 3, 4, 5],
      //y: [1, 2, 4, 8, 16] }];
  
    //Plotly.newPlot("plot", data);
 // }

  // Call updatePlotly() when a change takes place to the DOM
//d3.selectAll("#selDataset").on("change", updatePlotly);
