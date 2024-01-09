const contentArrow = document.querySelector(".content__arrow_icon");
const headerInfoBox = document.querySelector(".header__top_link_box");
const abstractHeaderInfoNav = document.querySelector(".header__top_links");
const selectBox = document.querySelector("#pass");
const countrySelectionBox = document.querySelector(".current");
const countriesListContainer = document.querySelector(".list__country");
const countryArrow = document.querySelector(".country__arrow_icon");
const nevbar = document.querySelector(".header__down");
const nevbarTop = document.querySelector(".header__top");

//TODO: Checking if respective component have hidden class or not
const checkHidden = function (component, arrow) {
  component.classList.contains("hidden")
    ? (arrow.style.rotate = "180deg")
    : (arrow.style.rotate = "0deg");
};

//TODO: Handling account button on top header
headerInfoBox.addEventListener("click", () => {
  checkHidden(abstractHeaderInfoNav, contentArrow);
  abstractHeaderInfoNav.classList.toggle("hidden");
});

const addValue = (num) => {
  selectBox.insertAdjacentHTML(
    "beforeend",
    num === 8
      ? `<option value=${num}>${num}+</option>`
      : `<option value=${num}>${num}</option>`
  );
};

//TODO: Adding values in select tag
for (let i = 1; i < 9; i++) {
  addValue(i);
}

//TODO: Creating list for countries
fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    const first23Country = data.filter((el, i) => i < 23);

    first23Country.forEach((country) => {
      countriesListContainer.insertAdjacentHTML(
        "beforeend",
        `<div class='country__option'>
          <img class='img__country' src=${country.flags.png} alt='country Image' />
          <p class=country__name>${country.name.common}</p>
        </div>`
      );
    });
  });

//TODO: Country Selection and dropdown
countrySelectionBox.addEventListener("click", () => {
  checkHidden(countriesListContainer, countryArrow);
  countriesListContainer.classList.toggle("hidden");
});

//TODO:  Sticky Navigation
const observerCallback = (entries) => {
  const [entry] = entries;
  !entry.isIntersecting
    ? nevbar.classList.add("fixed")
    : nevbar.classList.remove("fixed");
};

const observerOptions = {
  root: null,
  threshold: 0,
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
observer.observe(nevbarTop);
