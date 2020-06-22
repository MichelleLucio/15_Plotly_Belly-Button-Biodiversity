function init() {
  let selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data);
    let sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector.append("option").text(sample).property("value", sample);
    });

    let firstSubject = sampleNames[0];
    buildMetadata(firstSubject);
    buildCharts(firstSubject);
  })
};

function optionChanged(newSubject){
  buildMetadata(newSubject);
  buildCharts(newSubject);
  console.log(newSubject);
};

function buildMetadata(sample){
  d3.json("samples.json").then((data) => {
    //console.log(data);
    let metadataInfo = data.metadata;
    let metaArray = metadataInfo.filter(metadataInfo => metadataInfo.id == sample);
    let subjectid = metaArray[0];
    let panelMeta = d3.select("#sample-metadata")
    panelMeta.html("");

    Object.entries(subjectid).forEach(([key, value]) => {
      panelMeta.append("p").text(key + " : " +value)
    });
})};

function buildCharts(sample){
  d3.json("samples.json").then((data) => {
    //console.log(data);
    let mysampleInfo = data.samples;
    let resultArray = mysampleInfo.filter(mysampleInfo => mysampleInfo.id == sample);
    let myresult = resultArray[0];
    console.log(myresult);
    //slice out top 10 species & reverse
    let otuIDs = myresult.otu_ids.slice(0, 10);
    let otuLabels = myresult.otu_labels.slice(0, 10);
    let otuValues = myresult.sample_values.slice(0, 10);
    console.log(otuIDs, otuLabels, otuValues);
  });

  let trace1 = {
    type: "bar",
    //hoverinfo: otuLabels,
    orientation: "h",
    x: otuValues,
    y: otuIDs.map((id) => "OTU "+ id),
    text: otuLabels

  };

  let layout1 = {
    title: "Top 10 bacterial species in the belly button"
  };
  Plotly.newPlot("bar", [trace1], layout1);
};

init();