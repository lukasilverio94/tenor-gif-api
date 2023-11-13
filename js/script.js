// API_KEY: AIzaSyA7HnnTH6-rwTRmkWze4MIhMIS9438UkSc
const apiKey = "AIzaSyA7HnnTH6-rwTRmkWze4MIhMIS9438UkSc";
const url = `https://api.tenor.com/v1/search?q=excited&key=LIVDSRZULELA&limit=8`;

const inputElement = document.querySelector("#filter");
const searchBtn = document.querySelector("#search");
const containerGif = document.querySelector("#container-gif");
let searchQuery = "cats";

searchBtn.addEventListener("click", getGifs);

//Async Function Fetch data
async function getGifs() {
  searchQuery = inputElement.value.trim();

  const response = await fetch(url);

  //data
  const data = await response.json();
  console.log(data);

  if (data.results && data.results.length > 0) {
    // Clear previous results
    clearResults();

    // Iterate over the results array and create DOM elements
    data.results.map((gif) => {
      const div = document.createElement("div");
      const img = document.createElement("img");  

      img.setAttribute("src", gif.media[0].gif.url); // Adjust this based on the actual structure of your data

      div.appendChild(img);
      containerGif.appendChild(div);
    });
  } else {
    containerGif.textContent = "Not result found";
  }
}

// // Helper function to clear previous results
function clearResults() {
  const previousResults = document.querySelectorAll(".img-fluid");
  previousResults.forEach((result) => result.remove());
}
