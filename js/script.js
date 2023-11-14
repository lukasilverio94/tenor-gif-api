const inputElement = document.querySelector("#filter");
const searchBtn = document.querySelector("#search");
const containerGif = document.querySelector("#container-gif");
let searchQuery = "cats";

//Async Function Fetch data
async function getGifs() {
  searchQuery = inputElement.value.trim();
  const url = `https://api.tenor.com/v1/search?q=${searchQuery}&key=LIVDSRZULELA&limit=8`;

  const response = await fetch(url);

  //data from response
  const data = await response.json();
  console.log(data);

  if (data.results && data.results.length > 0) {
    // Clear previous results
    clearResults();
    //Check if user typed something at input
    validateInput();
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

searchBtn.addEventListener("click", getGifs);
// // Helper function to clear previous results
function clearResults() {
  containerGif.innerHTML = "";
}

function validateInput() {
  if (inputElement.value === "") {
    containerGif.innerHTML = `<p class="text-danger fw-bold">Type something...</p>`;
  }
}
