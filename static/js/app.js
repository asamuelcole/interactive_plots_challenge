
// Unpack Data
// function unpack(rows, index) {
//     return rows.map(function(row) {
//       return row[index];
//     });
//   }
  

// Fetch data
function plotting(id) {
  d3.json("./samples.json").then(function(data) {
      var ids = data.samples[0].otu_ids;
      var samples_10 = data.samples[0].sample_values.slice(0, 10).reverse();
      var labels_10 = data.samples[0].otu_labels.slice(0, 10)
      var OTU_top = ids.slice(0, 10).reverse();
      var OTU_id = OTU_top.map(d => "OTU " + d);
      var labels = data.samples[0].otu_labels;
      var samples = data.samples[0].sample_values;


    // Build trace for bar plot
      var trace1 = {
        type: "bar",
        x: samples_10,
        y: OTU_id,
        orientation: "h",
        text: labels_10
      };
    
    // Build data for bar plot
      var data1 = [trace1];

    // Build plot
      Plotly.newPlot("bar", data1)
  
    // Build trace for bubble plot
      var trace2 = {
        x: ids,
        y: samples,
        mode: 'markers',
        marker: {
          size: samples,
          color: ids,
        },
        text: labels
      };

    //Build bubble plot
      var data2 = [trace2];

    // Build plot
      Plotly.newPlot("bubble", data2)
     
});
}

// create the function to get the necessary data
function demographs(id) {
  // read the json file to get data
      d3.json("./samples.json").then((data)=> {
  // get the metadata info for the demographic panel
          var metadata = data.metadata;
  
          console.log(metadata)
  
        // filter meta data info by id
         var result = metadata.filter(meta => meta.id.toString() === id)[0];
        // select demographic panel to put data
         var demographicInfo = d3.select("#sample-metadata");
          
       // empty the demographic info panel each time before getting new id info
         demographicInfo.html("");
  
       // grab the necessary demographic data data for the id and append the info to the panel
          Object.entries(result).forEach((key) => {   
              demographicInfo.append("h5").text(key[0] + ": " + key[1] + "\n");    
          });
      });
  }
  // create the function for the change event
  function optionChanged(id) {
      plotting(id);
      demographs(id);
  }
  
  // data rendering function
  function init() {
      // dropdown menu 
      var dropdown = d3.select("#selDataset");
  
      // read data 
      d3.json("./samples.json").then((data)=> {
          console.log(data)
  
          // id data to display
          data.names.forEach(function(name) {
              dropdown.append("option").text(name).property("value");
          });
  
          // call the functions to display the data and the plots to the page
          plotting(data.names[0]);
          demographs(data.names[0]);
      });
  }
  
  init();
