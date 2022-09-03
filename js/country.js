const getCountry = async (name) => {
  const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
  if (!res.ok) {
    throw new Error("Error interacting with the API");
  }

  if (res.status != 200) {
    throw new Error("Error with status code: " + res.status);
  }

  return res.json();
};

let countryDis = document.querySelector(".main-display");
let rightDisplay = document.querySelector(".right-display");

let display = countryDis.querySelector(".display-details");

let leftDetail = document.querySelector(".left-details");
let rightDetail = document.querySelector(".right-details");
let displayBorder = document.querySelector(".display-border");

// console.log(display, leftDetail, rightDetail, displayBorder);

const updatePage = async () => {
  const address = new URLSearchParams(window.location.search);
  const country = address.get("country");
  const goBack = () =>
    (window.location.href = window.location.origin + "./index.html");

  if (!country) {
    alert(`${country} is not a valid country!`);
    goBack();
  }
  try {
    const req = await getCountry(country);
    let detail = req[0];

    console.log(detail);

    let imageContainer = document.createElement("div");
    imageContainer.className = "display-image";
    let image = document.createElement("img");
    image.setAttribute("src", detail.flags.svg);
    image.setAttribute("alt", country);
    imageContainer.appendChild(image);

    let header = document.createElement("h1");
    header.innerHTML = country;

    let p = document.createElement("p");
    p.innerHTML = "";
    for (const key in detail.name.nativeName) {
      p.innerHTML += detail.name.nativeName[key].common + ",";
    }
    let x = p.innerHTML.split(",");
    x = x[x.length - 2];

    p.innerHTML = `<span>Native Name :</span> ${x} <br>`;
    p.innerHTML += `
    <span>Population :</span> ${detail.population} <br>
    <span>Region :</span> ${detail.region} <br>
    <span>Sub Region :</span> ${detail.subregion} <br>
    <span>Capital :</span> ${detail.capital} <br>`;
    leftDetail.appendChild(p);
    display.appendChild(leftDetail);

    let q = document.createElement("p");
    q.innerHTML = `<span>Total Level :</span> ${detail.name.common} <br>`;

    let word = "";
    for (const key in detail.currencies) {
      word += detail.currencies[key].name;
    }
    q.innerHTML += `<span>Currencies:</span> ${word}<br>`;

    let cont = "";
    for (const key in detail.languages) {
      cont += detail.languages[key] + ",";
    }
    cont = cont.slice(0, -1);
    q.innerHTML += `<span>Languages:</span> ${cont}<br>`;

    rightDetail.appendChild(q);
    display.appendChild(rightDetail);

    let r = document.createElement("span");
    r.innerHTML = "Border Countries: ";
    let list = document.createElement("div");
    list.setAttribute("class", "border-list");
    for (const key in detail.borders) {
      let but = document.createElement("button");
      but.innerHTML = detail.borders[key];
      list.appendChild(but);
    }
    displayBorder.appendChild(r);
    displayBorder.appendChild(list);

    rightDisplay.appendChild(header);
    rightDisplay.appendChild(display);
    rightDisplay.appendChild(displayBorder);

    countryDis.appendChild(imageContainer);
    countryDis.appendChild(rightDisplay);
  } catch (err) {
    alert(err);
    goBack();
  }
};

// console.log(updatePage());
updatePage();

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
