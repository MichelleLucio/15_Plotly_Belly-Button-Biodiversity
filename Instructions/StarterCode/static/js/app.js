// Fetch the JSON data and console log it
let myRequest = new Request ("../samples.json");

d3.json(myRequest).then((data) => {
  console.log(data)
});




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
