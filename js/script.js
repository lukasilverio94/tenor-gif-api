const inputElement = document.querySelector("#filter");
const searchBtn = document.querySelector("#search");
const containerGif = document.querySelector("#container-gif");
let searchQuery;

//Async Function Fetch data
async function getGifs() {
  try {
    searchQuery = inputElement.value.trim();

    const url = `https://api.tenor.com/v1/search?q=${searchQuery}&key=LIVDSRZULELA&limit=8`;

    const response = await fetch(url);

    //Error if response is not ok
    if (!response.ok) {
      throw new Error(`HTTP Error: Status: ${response.status}`);
    }
    //data from response
    const data = await response.json();

    //if we got data response
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
    }
    //Handle error:
  } catch (error) {
    console.log("Error: ", error);
    containerGif.textContent = "An error occurred, try again later...";
  }
  //Clear input after type and submit serach at button.
  inputElement.value = "";
}

//Handle Click Event Button
searchBtn.addEventListener("click", () => {
  if (inputElement.value.trim() !== "") {
    clearResults();
    getGifs();
  } else {
    containerGif.innerHTML = `<p class="text-danger fw-semibold">Invalid input</p>`;
  }
});

// // Helper function to clear previous results
function clearResults() {
  containerGif.innerHTML = "";
}
