function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    const metadata = data.metadata;
    const result = metadata.filter(sampleObj => sampleObj.id == sample)[0];
    const panel = d3.select("#sample-metadata");
    panel.html("");
    Object.entries(result).forEach(([key, value]) => {
      panel.append("h6").text(`${key}: ${value}`);
    });
  });
}

function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    const samples = data.samples;
    const result = samples.filter(sampleObj => sampleObj.id == sample)[0];
    const otu_ids = result.otu_ids;
    const otu_labels = result.otu_labels;
    const sample_values = result.sample_values;

    // Create a dictionary to store the total sample values for each unique OTU
    let otuCount = {};

    // Iterate through the data and accumulate the sample values for each unique OTU ID
    for (let i = 0; i < otu_ids.length; i++) {
      const otu_id = otu_ids[i];
      const value = sample_values[i];
      if (otuCount[otu_id]) {
        otuCount[otu_id] += value; // Add to the count if the OTU already exists
      } else {
        otuCount[otu_id] = value; // Otherwise, initialize it
      }
    }

    // Convert the otuCount object into an array of objects with otu_id and count
    const otuArray = Object.entries(otuCount).map(([otu_id, count]) => ({
      otu_id: parseInt(otu_id),
      count: count
    }));

    // Sort the array by count in descending order and slice the top 10
    const topOtuArray = otuArray.sort((a, b) => b.count - a.count).slice(0, 10);

    // Extract the OTU IDs, counts, and labels for the bar chart
    const topOtuIds = topOtuArray.map(item => `OTU ${item.otu_id}`);
    const topSampleValues = topOtuArray.map(item => item.count);
    const topOtuLabels = topOtuArray.map((item) => otu_labels[otu_ids.indexOf(item.otu_id)]);

    // Bar Chart
    const barData = [{
      type: "bar",
      x: topSampleValues, // Total bacteria count for each unique OTU
      y: topOtuIds, // OTU IDs for the y-axis
      text: topOtuLabels, // Hover text with the OTU labels
      orientation: 'h'
    }];
    const barLayout = {
      title: "Top 10 Bacteria Cultures Found", // Title of the bar chart
      xaxis: { title: "Number of Bacteria" }, // X-axis label
      yaxis: { title: "OTU ID" } // Y-axis label
    };
    Plotly.newPlot("bar", barData, barLayout);

    // Bubble Chart
    const bubbleData = [{
      type: "scatter",
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: 'Earth'
      }
    }];
    const bubbleLayout = {
      title: "Bubble Chart of OTUs",
      xaxis: { title: "OTU ID" },
      yaxis: { title: "Sample Values" },
      showlegend: false
    };
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  });
}

function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    const sampleNames = data.names;
    const dropdown = d3.select("#selDataset");
    sampleNames.forEach((sample) => {
      dropdown.append("option").text(sample).property("value", sample);
    });
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  buildCharts(newSample);
  buildMetadata(newSample);
}

init();
