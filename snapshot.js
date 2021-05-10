(function ($) {
  $(function () {
    //filter
    // Snapshot Filter
    const filterMenu = document.getElementById("filter-menu");
    const filterButton = document.getElementById("filter-button");
    const filterWrapper = document.getElementById("filter-wrapper");
    const filterOptions = document.querySelectorAll(".filter-options-item");
    const filterBackButtons = document.querySelectorAll(".filter-header-back");
    const filterHeaderActive = document.getElementById("filter-header-active");
    const filterSearchBox = document.getElementById("filter-search-box");
    const filterSearch = document.getElementById("filter-search");
    const filterList = document.getElementById("filter-list");
    const filterClear = document.getElementById("filter-clear");
    const filterApply = document.getElementById("filter-apply");

    let isFilterOpen = false;
    let filters = {};

    filterButton.addEventListener("click", () => {
      filterMenu.classList.toggle("open");
    });
    //dummy data, this will need to be provided by the backend
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
      workplace: [
        "Agency Name 1",
        "Agency Name 2",
        "Agency Name 3",
        "Agency Name 4",
        "Agency Name 5",
        "Agency Name 6",
        "Agency Name 7",
        "Agency Name 8",
        "Agency Name 9",
      ],
    };

    //init top level filters
    const handleFilterClick = (e) => {
      //set filter title
      const filterTitle = e.target.childNodes[0].nodeValue;
      filterHeaderActive.innerHTML = filterTitle;

      // set filter ui ie. search-multi-select, search-single-select, multi-select, single-select
      const data = e.target.dataset;

      filterSearchBox.style.display = "search" in data ? "block" : "none";
      filterSearch.value = "";
      populateFilterContent(data, data.content);

      // open or close
      isFilterOpen = !isFilterOpen;
      if (isFilterOpen) {
        filterWrapper.classList.add("filter-wrapper--open");
      } else {
        filterWrapper.classList.remove("filter-wrapper--open");
      }
    };

    //init options
    filterOptions.forEach((option) => {
      option.addEventListener("click", handleFilterClick);
      const div = document.createElement("div");
      div.classList.add("filter-count");
      div.innerHTML = "All";
      option.appendChild(div);
    });

    const handleFilterBackClick = () => {
      initialItems = null;
      if (isFilterOpen) {
        filterWrapper.classList.remove("filter-wrapper--open");
        isFilterOpen = !isFilterOpen;
        updateSelectionCounts();
      } else {
        filterMenu.classList.toggle("open");
      }
    };

    filterBackButtons.forEach((btn) => {
      btn.addEventListener("click", handleFilterBackClick);
    });

    const updateSelectionCounts = () => {
      filterOptions.forEach((item) => {
        const filterType = item.dataset.type;
        const content = filters[item.dataset.content];
        const count = item.childNodes[1];
        if (filterType === "single-select") {
          count.innerHTML = content ? content[0] : "All";
        } else if (filterType === "single-range") {
          count.innerHTML = content ? `${content.min} - ${content.max}` : "All";
        } else if (content && filterType === "multi-range") {
          let min = 0;
          let max = 0;
          Object.entries(content).forEach((obj) => {
            min += parseFloat(obj[1].min) || 0;
            max += parseFloat(obj[1].max) || 0;
          });
          count.innerHTML = content ? `${min} - ${max}` : "All";
        } else {
          count.innerHTML = content ? content.length : "All";
        }
      });
    };

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
        lowInput.type = "number";
        lowInput.classList.add("filter-input", "filter-input--left");
        lowInput.addEventListener("input", function (e) {
          inputHandler(e, filterContent, item[0], "min");
        });

        //set state if exists
        if (currentData) {
          if (length === 1) {
            lowInput.value = currentData["min"];
          } else {
            lowInput.value = currentData[item[0]]
              ? currentData[item[0]]["min"]
              : null;
          }
        }

        // if( currentData[item[0]] )

        const highInputGroup = document.createElement("div");
        highInputGroup.classList.add("filter-input-group");

        const highInputLabel = document.createElement("label");
        highInputLabel.innerHTML = "To";

        const highInput = document.createElement("input");
        highInput.type = "number";
        highInput.classList.add("filter-input", "filter-input--right");
        highInput.addEventListener("input", function (e) {
          inputHandler(e, filterContent, item[0], "max");
        });

        if (currentData) {
          if (length === 1) {
            highInput.value = currentData["max"];
          } else {
            highInput.value = currentData[item[0]]
              ? currentData[item[0]]["max"]
              : null;
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

    let initialItems;

    const searchInputHandler = (e) => {
      const value = e.target.value;
      console.log(value);
      console.log(value.length);

      if (value.length === 1 && !initialItems) {
        initialItems = document.querySelectorAll("#filter-list li");
      } else if (value.length === 0) {
        initialItems.forEach((item) => {
          filterList.appendChild(item);
        });
      }
      console.log(initialItems);

      filterList.innerHTML = "";

      initialItems.forEach((item) => {
        const title = item.innerHTML.toLowerCase();

        if (title.includes(value.toLowerCase())) {
          filterList.appendChild(item);
        }
      });
    };

    filterSearch.addEventListener("input", searchInputHandler);

    //top level buttons
    filterClear.addEventListener("click", () => {
      filters = {};
      updateSelectionCounts();
    });
    filterApply.addEventListener("click", () => {
      // send to backend
    });

    var $resultsCont = document.getElementById("results-container");
    var $columnsButton = document.getElementById("columns-button");
    var $columnsModal = document.getElementById("columns-modal");
    var $modalArrow = document.getElementById("columns-modal-arrow");
    var $columnsToggleCont = document.getElementById("columns-label-container");
    var $modalButton = document.getElementById("columns-modal-button");

    var numHiddenCols = 0;

    var columnArray = [
      "Country",
      "City",
      "Workplace",
      "Agency",
      "Department",
      "Job Title",
      "Years of Experience",
      "Number of Employers",
      "Annual Salary",
      "Pay Transparency",
      "Salary Satisfaction",
      "Awards",
      "Race",
      "Gender",
      "Sexual Orientation",
      "Age",
      "Education",
    ];

    for (var column of columnArray) {
      // FOR TABLE
      var container = document.createElement("div");
      container.className = "column-container";
      container.id = `${column}-column`;

      var header = document.createElement("h2");
      header.className = "column-header";
      header.innerHTML = `${column}`;

      var entries = document.createElement("div");
      entries.className = "column-entries";
      entries.id = `${column}-entries`;

      container.appendChild(header);
      container.appendChild(entries);
      $resultsCont.appendChild(container);

      // FOR MODAL
      var columnLabelWrapper = document.createElement("div");
      columnLabelWrapper.className = "column-label-wrapper";

      var columnLabel = document.createElement("p");
      columnLabel.className = "column-label";
      columnLabel.innerHTML = `${column}`;

      var columnLabelIcon = document.createElement("img");
      columnLabelIcon.src = "/Assets/Images/column-icon-active.png";
      columnLabelIcon.className = "column-icon";
      columnLabelIcon.id = `${column}-icon`;
      columnLabelIcon.addEventListener("click", (evnt) => {
        var iconLabel = evnt.target.id.slice(0, -5);
        var selctedColumn = document.getElementById(`${iconLabel}-column`);
        if (selctedColumn.classList.length > 1) {
          selctedColumn.classList.remove("hide-column");
          evnt.target.src = "/Assets/Images/column-icon-active.png";
          numHiddenCols--;
          if (numHiddenCols === 0) {
            $modalButton.classList.remove("button-active");
          }
        } else {
          selctedColumn.classList.add("hide-column");
          evnt.target.src = "/Assets/Images/column-icon-inactive.png";
          numHiddenCols++;
          if (numHiddenCols === 1) {
            $modalButton.classList.add("button-active");
          }
        }
      });

      columnLabelWrapper.appendChild(columnLabel);
      columnLabelWrapper.appendChild(columnLabelIcon);
      $columnsToggleCont.appendChild(columnLabelWrapper);
    }

    var testData = [
      {
        Country: "Japan",
        City: "Tokyo",
        Agency: "Nintendo",
        "Job Title": "Game Level Designer",
        Race: "Black",
        Gender: "Female",
        Age: "26",
        "Sexual Orientation": "Heterosexual",
      },
      {
        Country: "United States of America",
        City: "New York City",
        Agency: "Google",
        "Job Title": "Google Docs Developer",
        Race: "Latina",
        Gender: "Female",
        Age: "28",
        "Sexual Orientation": "Bisexual",
      },
      {
        Country: "Jamaica",
        City: "Kingston",
        Agency: "Scotia Bank",
        "Job Title": "Senior Executive Finance Manager",
        Race: "Asian",
        Gender: "Female",
        Age: "22",
        "Sexual Orientation": "Gay",
      },
      {
        Country: "France",
        City: "Marseille",
        Agency: "Futbol Club de Marseille",
        "Job Title": "Coach",
        Race: "Caucasian",
        Gender: "Female",
        Age: "30",
        "Sexual Orientation": "Heterosexual",
      },
      {
        Country: "Brazil",
        City: "Rio de Janeiro",
        Agency: "Streets",
        "Job Title": "Hustler",
        Race: "white",
        Gender: "Male",
        Age: "49",
        "Sexual Orientation": "Bisexual",
      },
      {
        Country: "Argentina",
        City: "Buenos Aires",
        Agency: "Argentine Medical Facility",
        "Job Title": "Surgeon",
        Race: "Latino",
        Gender: "Male",
        Age: "55",
        "Sexual Orientation": "Gay",
      },
      {
        Country: "Ireland",
        City: "Dublin",
        Agency: "Brewery",
        "Job Title": "Taste Tester",
        Race: "Asian",
        Gender: "Male",
        Age: "27",
        "Sexual Orientation": "Gay",
      },
      {
        Country: "Hawaii",
        City: "Honolulu",
        Agency: "Bakery",
        "Job Title": "Owner",
        Race: "Black",
        Gender: "Male",
        Age: "40",
        "Sexual Orientation": "Heterosexual",
      },

      {
        Country: "Japan",
        City: "Tokyo",
        Agency: "Nintendo",
        "Job Title": "Game Level Designer",
        Race: "Black",
        Gender: "Female",
        Age: "26",
        "Sexual Orientation": "Heterosexual",
      },
      {
        Country: "United States of America",
        City: "New York City",
        Agency: "Google",
        "Job Title": "Google Docs Developer",
        Race: "Latina",
        Gender: "Female",
        Age: "28",
        "Sexual Orientation": "Bisexual",
      },
      {
        Country: "Jamaica",
        City: "Kingston",
        Agency: "Scotia Bank",
        "Job Title": "Senior Executive Finance Manager",
        Race: "Asian",
        Gender: "Female",
        Age: "22",
        "Sexual Orientation": "Gay",
      },
      {
        Country: "France",
        City: "Marseille",
        Agency: "Futbol Club de Marseille",
        "Job Title": "Coach",
        Race: "Caucasian",
        Gender: "Female",
        Age: "30",
        "Sexual Orientation": "Heterosexual",
      },
      {
        Country: "Brazil",
        City: "Rio de Janeiro",
        Agency: "Streets",
        "Job Title": "Hustler",
        Race: "white",
        Gender: "Male",
        Age: "49",
        "Sexual Orientation": "Bisexual",
      },
      {
        Country: "Argentina",
        City: "Buenos Aires",
        Agency: "Argentine Medical Facility",
        "Job Title": "Surgeon",
        Race: "Latino",
        Gender: "Male",
        Age: "55",
        "Sexual Orientation": "Gay",
      },
      {
        Country: "Ireland",
        City: "Dublin",
        Agency: "Brewery",
        "Job Title": "Taste Tester",
        Race: "Asian",
        Gender: "Male",
        Age: "27",
        "Sexual Orientation": "Gay",
      },
      {
        Country: "Hawaii",
        City: "Honolulu",
        Agency: "Bakery",
        "Job Title": "Owner",
        Race: "Black",
        Gender: "Male",
        Age: "40",
        "Sexual Orientation": "Heterosexual",
      },
      {
        Country: "Japan",
        City: "Tokyo",
        Agency: "Nintendo",
        "Job Title": "Game Level Designer",
        Race: "Black",
        Gender: "Female",
        Age: "26",
        "Sexual Orientation": "Heterosexual",
      },
      {
        Country: "United States of America",
        City: "New York City",
        Agency: "Google",
        "Job Title": "Google Docs Developer",
        Race: "Latina",
        Gender: "Female",
        Age: "28",
        "Sexual Orientation": "Bisexual",
      },
      {
        Country: "Jamaica",
        City: "Kingston",
        Agency: "Scotia Bank",
        "Job Title": "Senior Executive Finance Manager",
        Race: "Asian",
        Gender: "Female",
        Age: "22",
        "Sexual Orientation": "Gay",
      },
      {
        Country: "France",
        City: "Marseille",
        Agency: "Futbol Club de Marseille",
        "Job Title": "Coach",
        Race: "Caucasian",
        Gender: "Female",
        Age: "30",
        "Sexual Orientation": "Heterosexual",
      },
      {
        Country: "Brazil",
        City: "Rio de Janeiro",
        Agency: "Streets",
        "Job Title": "Hustler",
        Race: "white",
        Gender: "Male",
        Age: "49",
        "Sexual Orientation": "Bisexual",
      },
      {
        Country: "Argentina",
        City: "Buenos Aires",
        Agency: "Argentine Medical Facility",
        "Job Title": "Surgeon",
        Race: "Latino",
        Gender: "Male",
        Age: "55",
        "Sexual Orientation": "Gay",
      },
      {
        Country: "Ireland",
        City: "Dublin",
        Agency: "Brewery",
        "Job Title": "Taste Tester",
        Race: "Asian",
        Gender: "Male",
        Age: "27",
        "Sexual Orientation": "Gay",
      },
      {
        Country: "Hawaii",
        City: "Honolulu",
        Agency: "Bakery",
        "Job Title": "Owner",
        Race: "Black",
        Gender: "Male",
        Age: "40",
        "Sexual Orientation": "Heterosexual",
      },
      {
        Country: "Japan",
        City: "Tokyo",
        Agency: "Nintendo",
        "Job Title": "Game Level Designer",
        Race: "Black",
        Gender: "Female",
        Age: "26",
        "Sexual Orientation": "Heterosexual",
      },
      {
        Country: "United States of America",
        City: "New York City",
        Agency: "Google",
        "Job Title": "Google Docs Developer",
        Race: "Latina",
        Gender: "Female",
        Age: "28",
        "Sexual Orientation": "Bisexual",
      },
      {
        Country: "Jamaica",
        City: "Kingston",
        Agency: "Scotia Bank",
        "Job Title": "Senior Executive Finance Manager",
        Race: "Asian",
        Gender: "Female",
        Age: "22",
        "Sexual Orientation": "Gay",
      },
      {
        Country: "France",
        City: "Marseille",
        Agency: "Futbol Club de Marseille",
        "Job Title": "Coach",
        Race: "Caucasian",
        Gender: "Female",
        Age: "30",
        "Sexual Orientation": "Heterosexual",
      },
      {
        Country: "Brazil",
        City: "Rio de Janeiro",
        Agency: "Streets",
        "Job Title": "Hustler",
        Race: "white",
        Gender: "Male",
        Age: "49",
        "Sexual Orientation": "Bisexual",
      },
      {
        Country: "Argentina",
        City: "Buenos Aires",
        Agency: "Argentine Medical Facility",
        "Job Title": "Surgeon",
        Race: "Latino",
        Gender: "Male",
        Age: "55",
        "Sexual Orientation": "Gay",
      },
      {
        Country: "Ireland",
        City: "Dublin",
        Agency: "Brewery",
        "Job Title": "Taste Tester",
        Race: "Asian",
        Gender: "Male",
        Age: "27",
        "Sexual Orientation": "Gay",
      },
      {
        Country: "Hawaii",
        City: "Honolulu",
        Agency: "Bakery",
        "Job Title": "Owner",
        Race: "Black",
        Gender: "Male",
        Age: "40",
        "Sexual Orientation": "Heterosexual",
      },
      {
        Country: "Japan",
        City: "Tokyo",
        Agency: "Nintendo",
        "Job Title": "Game Level Designer",
        Race: "Black",
        Gender: "Female",
        Age: "26",
        "Sexual Orientation": "Heterosexual",
      },
      {
        Country: "United States of America",
        City: "New York City",
        Agency: "Google",
        "Job Title": "Google Docs Developer",
        Race: "Latina",
        Gender: "Female",
        Age: "28",
        "Sexual Orientation": "Bisexual",
      },
      {
        Country: "Jamaica",
        City: "Kingston",
        Agency: "Scotia Bank",
        "Job Title": "Senior Executive Finance Manager",
        Race: "Asian",
        Gender: "Female",
        Age: "22",
        "Sexual Orientation": "Gay",
      },
      {
        Country: "France",
        City: "Marseille",
        Agency: "Futbol Club de Marseille",
        "Job Title": "Coach",
        Race: "Caucasian",
        Gender: "Female",
        Age: "30",
        "Sexual Orientation": "Heterosexual",
      },
      {
        Country: "Brazil",
        City: "Rio de Janeiro",
        Agency: "Streets",
        "Job Title": "Hustler",
        Race: "white",
        Gender: "Male",
        Age: "49",
        "Sexual Orientation": "Bisexual",
      },
      {
        Country: "Argentina",
        City: "Buenos Aires",
        Agency: "Argentine Medical Facility",
        "Job Title": "Surgeon",
        Race: "Latino",
        Gender: "Male",
        Age: "55",
        "Sexual Orientation": "Gay",
      },
      {
        Country: "Ireland",
        City: "Dublin",
        Agency: "Brewery",
        "Job Title": "Taste Tester",
        Race: "Asian",
        Gender: "Male",
        Age: "27",
        "Sexual Orientation": "Gay",
      },
      {
        Country: "Hawaii",
        City: "Honolulu",
        Agency: "Bakery",
        "Job Title": "Owner",
        Race: "Black",
        Gender: "Male",
        Age: "40",
        "Sexual Orientation": "Heterosexual",
      },
    ];

    for (var columnHeading of columnArray) {
      for (var data of testData) {
        var output = document.getElementById(`${columnHeading}-entries`);
        var entryCont = document.createElement("div");
        entryCont.className = "entry";
        var entry = document.createElement("p");
        entry.className = "entry-label";

        var keyArr = Object.keys(data);
        for (var key of keyArr) {
          if (columnHeading === key) {
            entry.innerHTML = data[key];
          }
        }

        entryCont.appendChild(entry);
        output.appendChild(entryCont);
      }
    }

    var $totalAmount = document.getElementById("total-amount");
    $totalAmount.innerHTML = `${testData.length * 10000}`;

    $columnsButton.addEventListener("click", () => {
      if ($columnsModal.classList.length === 1) {
        $columnsModal.classList.remove("hide-modal");
      } else {
        $columnsModal.classList.add("hide-modal");
      }
    });

    $modalArrow.addEventListener("click", () => {
      $columnsModal.classList.add("hide-modal");
    });
  });
})(jQuery);
