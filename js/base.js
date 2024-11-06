const breeds = ["affenpinscher", "african", "airedale", "akita", "appenzeller"]
const container = document.querySelector('.container')

async function fetchSummary(breed) {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${breed}`

    const res = await fetch(url)
    const data = await res.json()
    return data.extract

}

async function fetchImage(breed) {
    const url = `https://dog.ceo/api/breed/${breed}/images/random`

    const res = await fetch(url)
    const data = await res.json()
    return data.message

}

async function createWikiItem(breed) {
  const summary = await fetchSummary(breed)
  const imgUrl = await fetchImage(breed)

  const wikiItem = document.createElement('div')
  wikiItem.classList.add('wiki-item')

  const wikiHeader = document.createElement('h1')
  wikiHeader.classList.add('wiki-header')
  wikiHeader.textContent = breed
  wikiItem.appendChild(wikiHeader);

  const wikiContent = document.createElement('div')
  wikiContent.classList.add('wiki-content')

  const wikiText = document.createElement('p')
  wikiText.classList.add('wiki-text')
  wikiText.textContent = summary
  wikiContent.appendChild(wikiText)

  const imgContainer = document.createElement('div')
  imgContainer.classList.add('img-container')

  const img = document.createElement('img')
  img.classList.add('wiki-img')
  img.src = imgUrl
  imgContainer.appendChild(img)

  wikiContent.appendChild(imgContainer)
  wikiItem.appendChild(wikiContent)

  container.appendChild(wikiItem)
}

breeds.forEach(breed => createWikiItem(breed));
