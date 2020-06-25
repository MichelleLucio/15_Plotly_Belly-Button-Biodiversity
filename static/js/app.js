function init() {
  let selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data);
    const allmyData = data
    let sampleNames = allmyData.names;
    sampleNames.forEach((sample) => {
      selector.append("option").text(sample).property("value", sample);
    });

    let firstSubject = sampleNames[0];
    buildMetadata(firstSubject);
    buildCharts(firstSubject);
    gaugeChart(firstSubject);
  })
};

function optionChanged(newSubject){
  buildMetadata(newSubject);
  console.log(newSubject);
  buildCharts(newSubject);
  // gaugeChart(newSubject);  
};

function buildMetadata(sample1){
  d3.json("samples.json").then((data) => {
    //console.log(data);
    let metadataInfo = data.metadata;
    let metaArray = metadataInfo.filter(metadataInfo => metadataInfo.id == sample1);
    let subjectid = metaArray[0];
    let washFreq = subjectid.wfreq;
    console.log(washFreq);
    let panelMeta = d3.select("#sample-metadata")
    panelMeta.html("");

    Object.entries(subjectid).forEach(([key, value]) => {
      panelMeta.append("p").text(key + " : " +value)
    });
  gaugeChart(washFreq);
 
})};

function buildCharts(sample2){
  d3.json("samples.json").then((data) => {
    //console.log(data);
    let mysampleInfo = data.samples;
    let resultArray = mysampleInfo.filter(mysampleInfo => mysampleInfo.id == sample2);
    let myresult = resultArray[0];
    console.log(myresult);
    //slice out top 10 species & reverse
    let otuValues = myresult.sample_values.slice(0, 10).reverse();
    let otuIDs = myresult.otu_ids.slice(0, 10).reverse();
    let otuLabels = myresult.otu_labels.slice(0, 10).reverse();
 
    console.log(otuValues, otuIDs, otuLabels);
//create bar chart
  let trace1 = {
    x: otuValues,
    y: otuIDs.map((id) => "OTU "+ id),
    type: "bar",
    hoverinfo: otuLabels,
    orientation: "h",
    text: otuLabels
  };

  let layout1 = {
    title: "Top 10 bacterial species in the belly button",
    xaxis: {title: "Volume of OTU"},
    yaxis: {title: "OTU IDs"}
  };
  Plotly.newPlot("bar", [trace1], layout1);

//create bubble chart
  let trace2 = {
    y: otuValues,
    x: otuIDs,
    type: "bubble",
    hoverinfo: otuLabels,
    text: otuLabels,
    marker: {
      color: otuIDs,
      size: otuValues
    },
    mode: 'markers',
  };

  let layout2 = {
    title: "Bubble Chart of OTUs in the belly button",
    yaxis: {title: "Volume of OTU"},
    xaxis: {title: "OTU IDs"}
  };
  Plotly.newPlot("bubble", [trace2], layout2);

})};

function gaugeChart(sample3){
  // d3.json("samples.json").then((data) => {
    //console.log(data);
    // let mywashInfo = data.metadata;
    // let washArray = mywashInfo.filter(mywashInfo => mywashInfo.id == sample3);
    // console.log(washArray);
    // let mywashFreq = (sample3.wfreq); //**NOT WORKING */
    // console.log(mywashFreq);

  let gaugeTrace = {
      type: "indicator",
      mode: "gauge+number",
      value: sample3, //parseInt(mywashFreq),
      title: { text: "Frequency of Belly Washing<br> Scrubs per Week", font: { size: 24 } },
      gauge: {
        axis: { range: [0, 9], tickwidth: 1, tickcolor: "darkblue" },
        bar: { color: "darkblue" },
        bgcolor: "white",
        borderwidth: 2,
        bordercolor: "gray",
        steps: [
          { range: [0, 1], color: 'rgb(190,190,190)' },
          { range: [1, 2], color: 'rgb(166,206,227)' },
          { range: [2, 3], color: 'rgb(171,217,233)'},
          { range: [3, 4], color: 'rgb(116,173,209)' },
          { range: [4, 5], color: 'rgb(31,120,180)' },
          { range: [5, 6], color: 'rgb(178,223,138)' },
          { range: [6, 7], color: 'rgb(51,160,44)' },
          { range: [7, 8], color: 'rgb(251,154,153)' },
          { range: [8, 9], color: 'rgb(227,26,28)' },
        ],
        },
      };
    
  let gaugeLayout = {
      width: 500,
      height: 400,
      margin: { t: 25, r: 25, l: 25, b: 25 },
      paper_bgcolor: "lavender",
      font: { color: "darkblue", family: "Times New Roman" }
    };

  Plotly.newPlot('gauge', [gaugeTrace], gaugeLayout);
};

init();