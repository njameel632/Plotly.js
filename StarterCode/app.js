// Creating a Function for Data plootting
// Using D3 to load the samples data
function getPlot(id) {
  // Using D3 to load the samples data
  d3.json("samples.json").then((sampleData) => {
    console.log(sampleData);

    var wfreq = sampleData.metadata[0].wfreq;
    console.log(wfreq);

    var ids = sampleData.samples[0].otu_ids;
    console.log(ids);

    var sampleValues = sampleData.samples[0].sample_values
      .slice(0, 10)
      .reverse();
    console.log(sampleValues);

    var labels = sampleData.samples[0].otu_labels.slice(0, 10);
    console.log(labels);

    // Getting only top 10 OTUs

    var otu_top = sampleData.samples[0].otu_ids.slice(0, 10).reverse();

    // Changing OTU id format

    var otu_id = otu_top.map((d) => "OTU" + d);
    console.log(`OTU IDS: ${otu_id}`);

    // Getting the Top 10 Labels
    var labels = sampleData.samples[0].otu_labels.slice(0, 10);
    console.log(`OTU Labels: ${labels}`);

    // Creating A trace

    var trace1 = {
      x: sampleValues,
      y: otu_id,
      text: labels,
      marker: {
        color: "#191970",
      },
      type: "bar",
      orientation: "h",
    };

    var chartData = [trace1];

    var layout = {
      title: "Top 10 OTUs in Human Belly Button",
      yaxis: {
        tickmode: "linear",
      },
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 30,
      },
    };
    Plotly.newPlot("bar", chartData, layout);

    // Creating A Bubble Chart

    var trace2 = {
      x: sampleData.samples[0].otu_ids,
      y: sampleData.samples[0].sample_values,
      mode: "markers",
      marker: {
        size: sampleData.samples[0].sample_values,
        color: sampleData.samples[0].otu_ids,
      },
      text: sampleData.samples[0].otu_labels,
    };

    var chartData2 = [trace2];

    var layout2 = {
      xaxis: { title: "OTU ID" },
      yaxis: { title: "Sample Values" },
      height: 600,
      width: 1000,
    };

    Plotly.newPlot("bubble", chartData2, layout2);

    // Creating a Gauge Chart for Washing Frequency / Per Week

    var gaugedata = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: parseFloat(wfreq),
        title: { text: "Washing Frequency Per Week/ Scrubs Per Week" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 9] },
          steps: [
            { range: [0, 2], color: "#FFF8DC" },
            { range: [2, 4], color: "#8FBC8F" },
            { range: [4, 6], color: "#90EE90" },
            { range: [6, 8], color: "#3CB371" },
            { range: [8, 9], color: "#6B8E23" },
          ],
        },
      },
    ];

    var layout3 = { width: 600, height: 500, margin: { t: 0, b: 0 } };

    Plotly.newPlot("gauge", gaugedata, layout3);
  });
}

// Creating A function to get metadata

function getdemoinfo(id) {
  d3.json("samples.json").then((data) => {
    // getting metadata

    var metadata = data.metadata;

    console.log(metadata);

    var result = metadata.filter((meta) => meta.id.toString() === id)[0];
    // Putting The data into demographic Panel

    var demographicinfo = d3.select("#sample-metadata");

    // Emptying out The info panel

    demographicinfo.html("");

    Object.entries(result).forEach((key) => {
      demographicinfo
        .append("h5")
        .text(key[0].toUpperCase() + ":" + key[1] + "\n");
    });
  });
}

// Creating A Function for the Change of Event

function optionChanged(id) {
    getPlot(id);
    getdemoinfo(id);
}

// Creating A Function to Initialize the Data

function init() {

    var dropdown = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        console.log(data)


        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // Calling the Function to Display Selected Data

        getPlot(data.names[0]);
        getdemoinfo(data.names[0]);
    });
}

init();
