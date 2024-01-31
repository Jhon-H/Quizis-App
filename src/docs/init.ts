import fs from 'fs'
import { type Express } from 'express'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yaml'

export const swaggerDocs = (app: Express, port: number) => {
  console.log(process.cwd())
  const file = fs.readFileSync('./src/docs/swagger.yml', 'utf-8')
  const swaggerDocument: JSON = YAML.parse(file)

  // Route-Handler to visit our docs
  app.use(
    '/api/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      customCssUrl:
        'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css'
    })
  )

  // Make our docs in JSON format available
  app.get('/api/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerDocument)
  })
  console.log(
    `Version 1 Docs are available on http://localhost:${port}/api/docs`
  )
}
