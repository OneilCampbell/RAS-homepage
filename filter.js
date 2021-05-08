const filterWrapper = document.getElementById("filter-wrapper");
const filterOptions = document.querySelectorAll(".filter-options-item");
const filterBackButtons = document.querySelectorAll(".filter-header-back");
const filterHeaderActive = document.getElementById("filter-header-active");
const filterSearch = document.getElementById("filter-search");
const filterList = document.getElementById("filter-list");

//dummy data
let filterData = {
  countries: [
    "Canada",
    "USA",
    "Pakistan",
    "Grenada",
    "UK",
    "Wales",
    "Spain",
    "Singapore",
    "Brazil",
    "India",
    "Nigeria",
    "Mexico",
    "Jamaica",
  ],
  cities: [
    "Toronto",
    "London",
    "Chicago",
    "New York",
    "Washington",
    "Vancouver",
    "Calgary",
    "Mississauga",
    "Miami",
  ],
  departments: [
    "Business Affairs",
    "Business Development",
    "Client Services",
    "Consulting",
    "Creative",
    "Design",
    "Finance",
    "Media",
  ],
};

let isFilterOpen = false;
let filters = {};

const handleFilterClick = (e) => {
  //set filter title
  const filterTitle = e.target.innerHTML;
  filterHeaderActive.innerHTML = filterTitle;

  // set filter ui ie. search-multi-select, search-single-select, multi-select, single-select
  const data = e.target.dataset;

  filterSearch.style.display = "search" in data ? "block" : "none";
  populateFilterContent(data, data.content);

  // open or close
  isFilterOpen = !isFilterOpen;
  if (isFilterOpen) {
    filterWrapper.classList.add("filter-wrapper--open");
  } else {
    filterWrapper.classList.remove("filter-wrapper--open");
  }
};
filterOptions.forEach((option) => {
  option.addEventListener("click", handleFilterClick);
});

const handleFilterBackClick = () => {
  if (isFilterOpen) {
    filterWrapper.classList.remove("filter-wrapper--open");
    isFilterOpen = !isFilterOpen;
  }
};
filterBackButtons.forEach((btn) => {
  btn.addEventListener("click", handleFilterBackClick);
});

//use the options and specified data to create the filter content
const populateFilterContent = (options, dataType) => {
  const data = filterData[dataType];
  filterList.innerHTML = "";
  if (!data) return;

  data.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = item;

    if ("multiselect" in options) {
      li.addEventListener("click", function (e) {
        multiSelectHandler(e, dataType);
      });
    } else if ("singleselect" in options) {
      li.addEventListener("click", function (e) {
        singleSelectHandler(e, dataType);
      });
    }

    filterList.appendChild(li);
  });
};

//handle multiselect or single select
const multiSelectHandler = (e, dataType) => {
  const el = e.target;
  const value = e.target.innerHTML;

  el.classList.toggle("selected");

  updateSelectFilters(dataType, value);
};

const singleSelectHandler = (e, dataType) => {
  const el = e.target;
  const value = e.target.innerHTML;
  const items = filterList.getElementsByTagName("li");

  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove("selected");
  }

  el.classList.add("selected");

  if (filters[dataType] === value) {
    filters[dataType] = [];
  } else {
    filters[dataType] = value;
  }
};

const updateSelectFilters = (dataType, value) => {
  if (!(dataType in filters)) {
    filters[dataType] = [];
  }

  if (filters[dataType].includes(value)) {
    for (var i = 0; i < filters[dataType].length; i++) {
      if (filters[dataType][i] === value) {
        filters[dataType].splice(i, 1);
      }
    }
  } else {
    filters[dataType].push(value);
  }
};

const initFilters = () => {};

initFilters();
