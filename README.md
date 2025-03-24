# Bellybutton Biodiversity Dashboard

## Overview
The Bellybutton Biodiversity Dashboard is an interactive web application that visualizes microbiome data for various test subjects. The app provides insights into the diversity of bacterial species (OTUs) found in each subject's belly button. The data is visualized through a bar chart, bubble chart, and demographic panel that updates based on the selected test subject.

## Features
- **Interactive Dropdown**: Select a test subject from a dropdown menu.
- **Bar Chart**: Displays the top 10 OTUs for the selected subject.
- **Bubble Chart**: Shows the full distribution of OTUs for the selected subject.
- **Demographic Information**: Displays relevant information about the test subject, including ethnicity, gender, and frequency of belly button washing.

## Technologies Used
- **D3.js**: Used for rendering and manipulating the DOM for visualizations.
- **Plotly.js**: Used to create interactive charts, such as the bar and bubble charts.
- **Bootstrap**: Used for responsive layout and styling.
- **JavaScript**: For handling interactions and data updates.

## How to Use
1. **Launch the Application**: Open the `index.html` file in a web browser to view the dashboard.
2. **Select a Test Subject**: Use the dropdown menu to select a test subject. The charts and metadata will update dynamically.
3. **Visualize the Data**:
   - The **bar chart** displays the top 10 OTUs (Operational Taxonomic Units) for the selected subject.
   - The **bubble chart** shows a bubble plot representing the full set of OTUs, with the size of each bubble corresponding to its sample value.
   - The **demographic panel** shows details like age, gender, and ethnicity of the selected subject.

## How It Works
The app uses a JSON dataset (`samples.json`) that contains data for multiple test subjects, including sample values, OTU IDs, labels, and demographic information. The following steps happen when the page loads:
1. The app fetches the data from `samples.json` using D3.js.
2. It populates the dropdown menu with available sample IDs (test subjects).
3. When a user selects a test subject, the app:
   - Filters the data to retrieve the relevant sample data.
   - Displays the top 10 OTUs in a horizontal bar chart.
   - Displays all OTUs in a bubble chart, with markers sized and colored based on sample values.
   - Updates the demographic panel with relevant information about the selected test subject.

## Project Structure
/project-folder ├── index.html # The main HTML file that holds the structure of the dashboard. ├── app.js # JavaScript file that contains the logic to build the charts and metadata. ├── samples.json # JSON file containing the test subjects' microbiome data and metadata. └── README.md # This README file.

