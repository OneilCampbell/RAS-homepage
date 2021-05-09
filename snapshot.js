(function( $ ) {
    $(function() {

        var $resultsCont = document.getElementById('results-container')
        var $columnsButton = document.getElementById('columns-button')
        var $columnsModal = document.getElementById('columns-modal')
        var $modalArrow = document.getElementById('columns-modal-arrow')
        var $columnsToggleCont = document.getElementById('columns-label-container')
        var $modalButton = document.getElementById('columns-modal-button')

        var numHiddenCols = 0

        var columnArray = [
            "Country", "City", "Workplace", "Agency", "Department",
            "Job Title", "Years of Experience", "Number of Employers",
            "Annual Salary", "Pay Transparency", "Salary Satisfaction",
            "Awards", "Race", "Gender", "Sexual Orientation", "Age",
            "Education"
        ]

        for (var column of columnArray) {
            // FOR TABLE
            var container = document.createElement('div')
            container.className = 'column-container'
            container.id = `${column}-column`

            var header = document.createElement('h2')
            header.className = 'column-header'
            header.innerHTML = `${column}`

            var entries = document.createElement('div')
            entries.className = 'column-entries'
            entries.id = `${column}-entries`

            container.appendChild(header)
            container.appendChild(entries)
            $resultsCont.appendChild(container)

            // FOR MODAL
            var columnLabelWrapper = document.createElement('div')
            columnLabelWrapper.className = 'column-label-wrapper'

            var columnLabel = document.createElement('p')
            columnLabel.className = 'column-label'
            columnLabel.innerHTML = `${column}`

            var columnLabelIcon = document.createElement('img')
            columnLabelIcon.src = '/Assets/Images/column-icon-active.png'
            columnLabelIcon.className = 'column-icon'
            columnLabelIcon.id = `${column}-icon`
            columnLabelIcon.addEventListener('click', evnt => {
                var iconLabel = evnt.target.id.slice(0, -5)
                var selctedColumn = document.getElementById(`${iconLabel}-column`)
                if (selctedColumn.classList.length > 1) {
                    selctedColumn.classList.remove('hide-column')
                    evnt.target.src = '/Assets/Images/column-icon-active.png'
                    numHiddenCols--
                    if (numHiddenCols === 0) {
                        $modalButton.classList.remove('button-active')
                    }
                } else {
                    selctedColumn.classList.add('hide-column')
                    evnt.target.src = '/Assets/Images/column-icon-inactive.png'
                    numHiddenCols++
                    if (numHiddenCols === 1) {
                        $modalButton.classList.add('button-active')
                    }
                }
            })

            columnLabelWrapper.appendChild(columnLabel)
            columnLabelWrapper.appendChild(columnLabelIcon)
            $columnsToggleCont.appendChild(columnLabelWrapper)
        }

        var testData = [
            {Country: "Japan", City: "Tokyo", Agency: "Nintendo", "Job Title": "Game Level Designer", Race: "Black", Gender: "Female", Age: "26", "Sexual Orientation": "Heterosexual"},
            {Country: "United States of America", City: "New York City", Agency: "Google", "Job Title": "Google Docs Developer", Race: "Latina", Gender: "Female", Age: "28", "Sexual Orientation": "Bisexual"},
            {Country: "Jamaica", City: "Kingston", Agency: "Scotia Bank", "Job Title": "Senior Executive Finance Manager", Race: "Asian", Gender: "Female", Age: "22", "Sexual Orientation": "Gay"},
            {Country: "France", City: "Marseille", Agency: "Futbol Club de Marseille", "Job Title": "Coach", Race: "Caucasian", Gender: "Female", Age: "30", "Sexual Orientation": "Heterosexual"},
            {Country: "Brazil", City: "Rio de Janeiro", Agency: "Streets", "Job Title": "Hustler", Race: "white", Gender: "Male", Age: "49", "Sexual Orientation": "Bisexual"},
            {Country: "Argentina", City: "Buenos Aires", Agency: "Argentine Medical Facility", "Job Title": "Surgeon", Race: "Latino", Gender: "Male", Age: "55", "Sexual Orientation": "Gay"},
            {Country: "Ireland", City: "Dublin", Agency: "Brewery", "Job Title": "Taste Tester", Race: "Asian", Gender: "Male", Age: "27", "Sexual Orientation": "Gay"},
            {Country: "Hawaii", City: "Honolulu", Agency: "Bakery", "Job Title": "Owner", Race: "Black", Gender: "Male", Age: "40", "Sexual Orientation": "Heterosexual"},

            {Country: "Japan", City: "Tokyo", Agency: "Nintendo", "Job Title": "Game Level Designer", Race: "Black", Gender: "Female", Age: "26", "Sexual Orientation": "Heterosexual"},
            {Country: "United States of America", City: "New York City", Agency: "Google", "Job Title": "Google Docs Developer", Race: "Latina", Gender: "Female", Age: "28", "Sexual Orientation": "Bisexual"},
            {Country: "Jamaica", City: "Kingston", Agency: "Scotia Bank", "Job Title": "Senior Executive Finance Manager", Race: "Asian", Gender: "Female", Age: "22", "Sexual Orientation": "Gay"},
            {Country: "France", City: "Marseille", Agency: "Futbol Club de Marseille", "Job Title": "Coach", Race: "Caucasian", Gender: "Female", Age: "30", "Sexual Orientation": "Heterosexual"},
            {Country: "Brazil", City: "Rio de Janeiro", Agency: "Streets", "Job Title": "Hustler", Race: "white", Gender: "Male", Age: "49", "Sexual Orientation": "Bisexual"},
            {Country: "Argentina", City: "Buenos Aires", Agency: "Argentine Medical Facility", "Job Title": "Surgeon", Race: "Latino", Gender: "Male", Age: "55", "Sexual Orientation": "Gay"},
            {Country: "Ireland", City: "Dublin", Agency: "Brewery", "Job Title": "Taste Tester", Race: "Asian", Gender: "Male", Age: "27", "Sexual Orientation": "Gay"},
            {Country: "Hawaii", City: "Honolulu", Agency: "Bakery", "Job Title": "Owner", Race: "Black", Gender: "Male", Age: "40", "Sexual Orientation": "Heterosexual"},
            {Country: "Japan", City: "Tokyo", Agency: "Nintendo", "Job Title": "Game Level Designer", Race: "Black", Gender: "Female", Age: "26", "Sexual Orientation": "Heterosexual"},
            {Country: "United States of America", City: "New York City", Agency: "Google", "Job Title": "Google Docs Developer", Race: "Latina", Gender: "Female", Age: "28", "Sexual Orientation": "Bisexual"},
            {Country: "Jamaica", City: "Kingston", Agency: "Scotia Bank", "Job Title": "Senior Executive Finance Manager", Race: "Asian", Gender: "Female", Age: "22", "Sexual Orientation": "Gay"},
            {Country: "France", City: "Marseille", Agency: "Futbol Club de Marseille", "Job Title": "Coach", Race: "Caucasian", Gender: "Female", Age: "30", "Sexual Orientation": "Heterosexual"},
            {Country: "Brazil", City: "Rio de Janeiro", Agency: "Streets", "Job Title": "Hustler", Race: "white", Gender: "Male", Age: "49", "Sexual Orientation": "Bisexual"},
            {Country: "Argentina", City: "Buenos Aires", Agency: "Argentine Medical Facility", "Job Title": "Surgeon", Race: "Latino", Gender: "Male", Age: "55", "Sexual Orientation": "Gay"},
            {Country: "Ireland", City: "Dublin", Agency: "Brewery", "Job Title": "Taste Tester", Race: "Asian", Gender: "Male", Age: "27", "Sexual Orientation": "Gay"},
            {Country: "Hawaii", City: "Honolulu", Agency: "Bakery", "Job Title": "Owner", Race: "Black", Gender: "Male", Age: "40", "Sexual Orientation": "Heterosexual"},
            {Country: "Japan", City: "Tokyo", Agency: "Nintendo", "Job Title": "Game Level Designer", Race: "Black", Gender: "Female", Age: "26", "Sexual Orientation": "Heterosexual"},
            {Country: "United States of America", City: "New York City", Agency: "Google", "Job Title": "Google Docs Developer", Race: "Latina", Gender: "Female", Age: "28", "Sexual Orientation": "Bisexual"},
            {Country: "Jamaica", City: "Kingston", Agency: "Scotia Bank", "Job Title": "Senior Executive Finance Manager", Race: "Asian", Gender: "Female", Age: "22", "Sexual Orientation": "Gay"},
            {Country: "France", City: "Marseille", Agency: "Futbol Club de Marseille", "Job Title": "Coach", Race: "Caucasian", Gender: "Female", Age: "30", "Sexual Orientation": "Heterosexual"},
            {Country: "Brazil", City: "Rio de Janeiro", Agency: "Streets", "Job Title": "Hustler", Race: "white", Gender: "Male", Age: "49", "Sexual Orientation": "Bisexual"},
            {Country: "Argentina", City: "Buenos Aires", Agency: "Argentine Medical Facility", "Job Title": "Surgeon", Race: "Latino", Gender: "Male", Age: "55", "Sexual Orientation": "Gay"},
            {Country: "Ireland", City: "Dublin", Agency: "Brewery", "Job Title": "Taste Tester", Race: "Asian", Gender: "Male", Age: "27", "Sexual Orientation": "Gay"},
            {Country: "Hawaii", City: "Honolulu", Agency: "Bakery", "Job Title": "Owner", Race: "Black", Gender: "Male", Age: "40", "Sexual Orientation": "Heterosexual"},
            {Country: "Japan", City: "Tokyo", Agency: "Nintendo", "Job Title": "Game Level Designer", Race: "Black", Gender: "Female", Age: "26", "Sexual Orientation": "Heterosexual"},
            {Country: "United States of America", City: "New York City", Agency: "Google", "Job Title": "Google Docs Developer", Race: "Latina", Gender: "Female", Age: "28", "Sexual Orientation": "Bisexual"},
            {Country: "Jamaica", City: "Kingston", Agency: "Scotia Bank", "Job Title": "Senior Executive Finance Manager", Race: "Asian", Gender: "Female", Age: "22", "Sexual Orientation": "Gay"},
            {Country: "France", City: "Marseille", Agency: "Futbol Club de Marseille", "Job Title": "Coach", Race: "Caucasian", Gender: "Female", Age: "30", "Sexual Orientation": "Heterosexual"},
            {Country: "Brazil", City: "Rio de Janeiro", Agency: "Streets", "Job Title": "Hustler", Race: "white", Gender: "Male", Age: "49", "Sexual Orientation": "Bisexual"},
            {Country: "Argentina", City: "Buenos Aires", Agency: "Argentine Medical Facility", "Job Title": "Surgeon", Race: "Latino", Gender: "Male", Age: "55", "Sexual Orientation": "Gay"},
            {Country: "Ireland", City: "Dublin", Agency: "Brewery", "Job Title": "Taste Tester", Race: "Asian", Gender: "Male", Age: "27", "Sexual Orientation": "Gay"},
            {Country: "Hawaii", City: "Honolulu", Agency: "Bakery", "Job Title": "Owner", Race: "Black", Gender: "Male", Age: "40", "Sexual Orientation": "Heterosexual"},
        ]

        for (var columnHeading of columnArray) {
            for (var data of testData) {

                var output = document.getElementById(`${columnHeading}-entries`)
                var entryCont = document.createElement('div')
                entryCont.className = 'entry'
                var entry = document.createElement('p')
                entry.className = 'entry-label'

                var keyArr = Object.keys(data)
                for (var key of keyArr) {
                    if (columnHeading === key) {
                        entry.innerHTML = data[key]
                    }
                }

                entryCont.appendChild(entry)
                output.appendChild(entryCont)
            }
        }

        var $totalAmount = document.getElementById('total-amount')
        $totalAmount.innerHTML = `${testData.length * 10000}`

        $columnsButton.addEventListener('click', () => {
            if ($columnsModal.classList.length === 1) {
                $columnsModal.classList.remove('hide-modal')
            } else {
                $columnsModal.classList.add('hide-modal')
            }
        })

        $modalArrow.addEventListener('click', () => {
            $columnsModal.classList.add('hide-modal')
        })

    });
})( jQuery );