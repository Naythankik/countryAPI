let theme = () => {
  let element = document.querySelector(".body");
  if (element.classList.contains("dark")) {
    element.classList.remove("dark");
    element.classList.add("light");
  } else {
    element.classList.remove("light");
    element.classList.add("dark");
  }
};

let dropdown = document.querySelector(".filters-list");
let dropButton = document.querySelector(".filter");
dropButton.addEventListener("click", function () {
  dropdown.toggleAttribute("hidden");
});
const countryApi = async () => {
  const res = await fetch("https://restcountries.com/v3.1/all");
  if (!res.ok) {
    console.log("Error interacting with the API");
  }

  if (res.status != 200) {
    console.log("Error with status code: " + res.status);
  }

  return res.json();
};

const prepareURL = (origin, countryName) => {
  const url = new URL("./country.html", origin);
  url.searchParams.set("country", countryName);
  return url.toString();
};

let articleParents = document.querySelector(".main-section");
let showCountry = document.querySelector(".overlay-display");

const fetchedCountry = async () => {
  const countries = await countryApi();
  const origin = window.location.origin;
  for (const allCountry of countries) {
    //   }
    // countries.forEach((allCountry, index, arrays) => {
    let countryLink = prepareURL(origin, allCountry.name.common);
    let articleLink = document.createElement("a");
    articleLink.setAttribute("href", countryLink);
    let article = document.createElement("article");
    article.className = allCountry.name.common;

    let imageCont = document.createElement("div");
    imageCont.className = "image-container";

    let articleImage = document.createElement("img");
    articleImage.setAttribute("src", allCountry.flags.svg);
    articleImage.setAttribute("alt", allCountry.name.common);

    let articleDiv = document.createElement("div");
    articleDiv.classList.add("details");

    let divHeading = document.createElement("h3");
    divHeading.innerHTML = allCountry.name.common;

    let divBody = document.createElement("p");
    divBody.innerHTML = `<span>Population: </span> ${allCountry.population}
       <br> <span>Region: </span> ${allCountry.region}
        <br> <span>Capital: </span> ${allCountry.capital} `;

    imageCont.appendChild(articleImage);
    articleDiv.appendChild(divHeading);
    articleDiv.appendChild(divBody);
    article.appendChild(imageCont);
    article.appendChild(articleDiv);
    articleLink.appendChild(article);
    articleParents.appendChild(articleLink);
  }
};

// The invoking of the function
window.onload = fetchedCountry();
