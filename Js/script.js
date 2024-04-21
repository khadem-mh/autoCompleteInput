let $ = document
///////////////
let searchInputElem = $.querySelector('.search-input')
let inputElem = $.querySelector('input')
let autocomBoxElem = $.querySelector('.autocom-box')
let iconSearch = $.querySelector('.icon')
let resaultSearch = $.querySelector('.resaultSearch')
let listItemsArray
///////////////
inputElem.addEventListener('keyup', function (event) {

    if (event.key === 'Enter') {
        enterTextHandler()
    } else if (event.key === 'Escape') {
        history.go(0)
    }

    let inputValueElem = inputElem.value

    if (inputValueElem) {
        searchInputElem.classList.add('active')

        let filteredWords = suggestions.filter(function (word) {
            return word.toLowerCase().startsWith(inputValueElem.toLowerCase())
            //return word.toLowerCase().startWith(inputValueElem.toLowerCase() )
        })
        suggestionWordsGenerator(filteredWords)

    } else {
        searchInputElem.classList.remove('active')
    }
})

function suggestionWordsGenerator(wordsArray) {
    listItemsArray = wordsArray.map(function (word) {
        return '<li>' + word + '</li>'
    })

    let customWord

    if (!listItemsArray.length) {
        customWord = '<li>' + inputElem.value + '</li>'
    } else {
        customWord = listItemsArray.join('')
    }

    autocomBoxElem.innerHTML = customWord
    selectText()
}

function selectText() {
    let allListItem = autocomBoxElem.querySelectorAll('li')

    allListItem.forEach(function (wordItem) {
        wordItem.addEventListener('click', function (event) {
            inputElem.value = event.target.innerHTML
            searchInputElem.classList.remove('active')
        })
    })
}

function enterTextHandler() {

    if (inputElem.value === '' || !inputElem.value == listItemsArray.length || inputElem.value.length < 2) {
        resaultSearch.style.cssText = ' display: block; color: red; background-color: black; '
        resaultSearch.innerHTML = 'Your search for ∞ ' + inputElem.value + ' ∞ did not match any results.'
    } else {
        resaultSearch.style.cssText = ' display: block; color: white; background-color: green; '
        resaultSearch.innerHTML = '∞  ' + inputElem.value + '  ∞'
    }

    inputElem.value = ''
}

window.addEventListener('click', function () {
    searchInputElem.classList.remove('active')
})

iconSearch.addEventListener('click', enterTextHandler)