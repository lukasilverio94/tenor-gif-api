const inputElement = document.querySelector("#filter");
const searchBtn = document.querySelector("#search");
const containerGif = document.querySelector("#container-gif");
let searchQuery = "cats";
const apiKey = "AIzaSyA7HnnTH6-rwTRmkWze4MIhMIS9438UkSc";
const url = `https://api.tenor.com/v1/search?q=${searchQuery}&key=LIVDSRZULELA&limit=8`;

searchBtn.addEventListener("click", getGifs);

//Async Function Fetch data
async function getGifs() {
  searchQuery = inputElement.value.trim();
  console.log(searchQuery);

  const response = await fetch(url);

  //data from response
  const data = await response.json();
  console.log(data);

  if (data.results && data.results.length > 0) {
    // Clear previous results
    clearResults();
    // Iterate over the results  and create DOM elements
    data.results.forEach((gif) => {
      const div = document.createElement("div");
      const img = document.createElement("img");

      img.classList.add("img-fluid");
      img.setAttribute("src", gif.media[0].gif.url);

      div.appendChild(img);
      containerGif.appendChild(div);
    });
  } else {
    containerGif.textContent = "Not result found";
  }
}

// // Helper function to clear previous results
function clearResults() {
  containerGif.innerHTML = "";
}
