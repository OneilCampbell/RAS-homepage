const filterWrapper = document.getElementById("filter-wrapper");
const filterOptions = document.querySelectorAll(".filter-options-item");
const filterBackButtons = document.querySelectorAll(".filter-header-back");
const filterHeaderActive = document.getElementById("filter-header-active");
const filterSearch = document.getElementById("filter-search");
const filterList = document.getElementById("filter-list");

let isFilterOpen = false;
let filters = {};

//dummy data
let filterData = {
  gender: ["Female", "Male", "Non-binary", "Other"],
  race: [
    "Black",
    "White",
    "Asian/Southeast Asian",
    "Latinx",
    "American Indian/Pacific Islander",
    "Middle Eastern",
    "Mixed Race",
    "Other",
  ],
  awards: [
    ["top international awards", "cannes lions, d&ad"],
    ["international awards", "other than above"],
    ["local awards", "all local awards"],
  ],
  salary: [["", ""]],
  experience: [["", ""]],
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

//init top level filters
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
const populateFilterContent = (options, filterContent) => {
  const data = filterData[filterContent];
  if (!data) return;

  filterList.innerHTML = "";

  if (options.type === "multi-select" || options.type === "single-select") {
    buildSelectContent(data, options, filterContent);
  } else if (
    options.type === "multi-range" ||
    options.type === "single-range"
  ) {
    buildRangeContent(data, options, filterContent);
  }
};

const buildRangeContent = (data, options, filterContent) => {
  const currentData = filters[filterContent];
  const length = data.length;
  console.log(length);

  data.forEach((item) => {
    const li = document.createElement("li");

    if (item[0]) {
      const title = document.createElement("h3");
      title.innerHTML = item[0];
      li.appendChild(title);
    }

    if (item[1]) {
      const subtitle = document.createElement("h4");
      subtitle.innerHTML = item[1];
      li.appendChild(subtitle);
    }

    const lowInputGroup = document.createElement("div");
    lowInputGroup.classList.add("filter-input-group");

    const lowInputLabel = document.createElement("label");
    lowInputLabel.innerHTML = "From";

    const lowInput = document.createElement("input");
    lowInput.classList.add("filter-input", "filter-input--left");
    lowInput.addEventListener("input", function (e) {
      inputHandler(e, filterContent, item[0], "min");
    });

    //set state if exists
    if (currentData) {
      if (length === 1) {
        lowInput.value = currentData["min"];
      } else {
        lowInput.value = currentData[item[0]]["min"] || null;
      }
    }

    // if( currentData[item[0]] )

    const highInputGroup = document.createElement("div");
    highInputGroup.classList.add("filter-input-group");

    const highInputLabel = document.createElement("label");
    highInputLabel.innerHTML = "To";

    const highInput = document.createElement("input");
    highInput.classList.add("filter-input", "filter-input--right");
    highInput.addEventListener("input", function (e) {
      inputHandler(e, filterContent, item[0], "max");
    });

    if (currentData) {
      if (length === 1) {
        highInput.value = currentData["max"];
      } else {
        highInput.value = currentData[item[0]]["max"] || null;
      }
    }

    lowInputGroup.appendChild(lowInputLabel);
    lowInputGroup.appendChild(lowInput);
    li.appendChild(lowInputGroup);

    highInputGroup.appendChild(highInputLabel);
    highInputGroup.appendChild(highInput);
    li.appendChild(highInputGroup);

    filterList.appendChild(li);
  });
};

const buildSelectContent = (data, options, filterContent) => {
  const currentData = filters[filterContent];

  data.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = item;

    if (currentData) {
      currentData.forEach((itm) => {
        if (item === itm) {
          li.classList.add("selected");
        }
      });
    }

    if (options.type === "multi-select") {
      li.addEventListener("click", function (e) {
        multiSelectHandler(e, filterContent);
      });
    } else if (options.type === "single-select") {
      li.addEventListener("click", function (e) {
        singleSelectHandler(e, filterContent);
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
  console.log(filters);
};

const singleSelectHandler = (e, dataType) => {
  const el = e.target;
  const value = e.target.innerHTML;
  const items = filterList.getElementsByTagName("li");

  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove("selected");
  }

  if (filters[dataType] && filters[dataType][0] === value) {
    filters[dataType] = [];
    el.classList.remove("selected");
  } else {
    filters[dataType] = [value];
    el.classList.add("selected");
  }
  console.log(filters);
};

const inputHandler = (e, filterContent, key, pos) => {
  const value = e.target.value;

  if (!(filterContent in filters)) {
    filters[filterContent] = {};
  }

  if (key) {
    if (!(key in filters[filterContent])) {
      filters[filterContent][key] = {};
    }
    filters[filterContent][key][pos] = value;
  } else {
    filters[filterContent][pos] = value;
  }

  console.log(filters);
};

const initFilters = () => {};

initFilters();
