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

const handleSearchInput = (value) => {
  if (value.trim() === "") {
    clearDisplay();
    fetchedCountry();
  } else {
    fetchedCountry(value);
  }
};

const clearDisplay = () => {
  articleParents.innerHTML = "";
};

const countryApi = async (value) => {
  try {
    const res = await fetch(value);
    if (!res.ok) {
      console.error("Error interacting with the API");
      return [];
    }

    if (res.status !== 200) {
      console.error("Error with status code: " + res.status);
      return [];
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return [];
  }
};

const prepareURL = (origin, countryName) => {
  const url = new URL("./country.html", origin);
  url.searchParams.set("country", countryName);
  return url.toString();
};

let articleParents = document.querySelector(".main-section");

const fetchedCountry = async (value) => {
  const apiUrl = value
    ? `https://restcountries.com/v3.1/name/${value}`
    : "https://restcountries.com/v3.1/all";

  try {
    const countries = await countryApi(apiUrl);
    const origin = window.location.href;
    clearDisplay();
    const createCountryArticle = (country) => {
      let countryLink = prepareURL(origin, country.name.common);
      let articleLink = document.createElement("a");
      articleLink.setAttribute("href", countryLink);
      let article = document.createElement("article");
      article.className = country.name.common;

      let imageCont = document.createElement("div");
      imageCont.className = "image-container";

      let articleImage = document.createElement("img");
      articleImage.setAttribute("src", country.flags.svg);
      articleImage.setAttribute("alt", country.name.common);

      let articleDiv = document.createElement("div");
      articleDiv.classList.add("details");

      let divHeading = document.createElement("h3");
      divHeading.innerHTML = country.name.common;

      let divBody = document.createElement("p");
      divBody.innerHTML = `<span>Population: </span> ${country.population}
           <br> <span>Region: </span> ${country.region}
            <br> <span>Capital: </span> ${country.capital} `;

      imageCont.appendChild(articleImage);
      articleDiv.appendChild(divHeading);
      articleDiv.appendChild(divBody);
      article.appendChild(imageCont);
      article.appendChild(articleDiv);
      articleLink.appendChild(article);

      return articleLink;
    };

    if (countries.length === 1) {
      const country = countries[0];
      let countryLink = prepareURL(origin, country.name.common);
      let articleLink = document.createElement("a");
      articleLink.setAttribute("href", countryLink);
      let article = createCountryArticle(country);

      articleLink.appendChild(article);
      articleParents.appendChild(articleLink);
    } else if (countries.length > 1) {
      for (const country of countries) {
        let article = createCountryArticle(country);
        articleParents.appendChild(article);
      }
    } else {
    }
  } catch (error) {
    console.error("Error processing country data:", error.message);
  }
};

// The invoking of the function
window.onload = () => fetchedCountry();
