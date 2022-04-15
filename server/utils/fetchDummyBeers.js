import fetch from "node-fetch"
const fetchBeers = async () => {
    const res = await fetch("https://api.punkapi.com/v2/beers?page1&per_page=50")
    const beers = await res.json()
    return beers.map(beer => {
        const { id, name, tagline, description, image_url } = beer
        return {
            id, 
            name,
            tagline,
            description,
            image_url,
        }
    })
}
export default fetchBeers