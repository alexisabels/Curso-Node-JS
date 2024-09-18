const express = require('express')
const movies = require('./movies.json')
const cors = require('cors')
const crypto = require('node:crypto')
const { validateMovie, validatePartialMovie } = require('./schemas/movies')
const app = express()
app.use(express.json())
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:8080',
      'http://localhost:1234',
      'https://www.alexisabel.com/',
      'http://locahost:4321'
    ]
    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }
    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
}))
app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.json({ message: 'Hola mundo' })
})
// Todos los recursos que sean MOVIES se identifican con /movies
app.get('/movies', (req, res) => {
  // const origin = req.header('origin')
  // // cuando la petición es del mismo ORIGEN
  // // http://localhost:1234 -> http://localhost:1234
  // if (ACCEPTED_ORIGINS.includes(origin) || !origin) { // tambien por si no hay origen (propio host ✔)
  //   res.header('Access-Control-Allow-Origin', origin)
  // }
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      // si quieremos comparar sin case sensitive: usar .some
    )
    return res.json(filteredMovies)
  }
  res.json(movies)
})

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }
  movies.splice(movieIndex, 1)
  return res.json({ message: 'movie deleted' })
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)
  res.status(404).json({ message: 'Movie no encontrada' })
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)
  // const origin = req.header('origin')
  // if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
  //   res.header('Access-Control-Allow-Origin', origin)
  // }
  if (result.error) {
    return res.status(400).json({
      error:
       JSON.parse(result.error.message)
    })
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }
  // Esto no sería REST, porque estamos guardando
  // el estado de la app en memoria
  movies.push(newMovie)
  res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {
  const { id } = req.params
  const result = validatePartialMovie(req.body)
  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex < 0) return res.status(404).json({ message: 'Movie not found' })

  const updatedMovie = {
    ...movies[movieIndex],
    ...result.data
  }
  movies[movieIndex] = updatedMovie
  return res.json(updatedMovie)
})

// app.options('/movies/:id', (req, res) => {
//   const origin = req.header('origin')

//   if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
//     res.header('Access-Control-Allow-Origin', origin)
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
//   }
//   res.sendStatus(200)
// }
// )

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log('Escuchando en https://localhost.com:1234')
})
