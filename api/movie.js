import fetch from 'node-fetch'

export default async function handler(request, response) {
  const { title, page, id } = JSON.parse(request.body)
  const url = id
    ? `https://omdbapi.com?apikey=43bab277&i=${id}&plot=full`
    : `https://omdbapi.com?apikey=43bab277&s=${title}&page=${page}`

  const res = await fetch(url)
  const json = await res.json(res)
  response
    .status(200)
    .json(json)
  
}