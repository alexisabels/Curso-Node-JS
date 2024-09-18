const z = require('zod')
const movieSchema = z.object({
  // si una propiedad no está aquí: SE IGNORA.
  // por ejemplo si intentamos cambiar un ID en PATCH.
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required.'
  }),
  year: z.number().int().min(1900).max(2030),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url({
    message: 'Poster must be a valid url'
  }),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Crime', 'Thriller', 'Sci-Fi']),
    {
      required_error: 'Movie genre is required',
      invalid_type_error: 'Movie genre must be an array of enum Genre'
    }
  )
})

function validateMovie (input) {
  return movieSchema.safeParse(input)
}

function validatePartialMovie (input) {
  return movieSchema.partial().safeParse(input)
  // Este parcial hace todas las propiedades opcionales, de forma
  // que si no esta, no pasa nada, pero si está: la valida.
}
module.exports = {
  validateMovie,
  validatePartialMovie
}
