const express = require('express')
const Bundler = require('parcel-bundler')
const app = express()
const port = 3000

const sourceCode = [
  './pages/*.html',
  './pages/**/*.html',
]
const compiledFolder = '.dist'

// Statically serve up the .dist folder (which is generated on bundling)
app.use(express.static(compiledFolder))

// Create a bundler
let bundler = new Bundler(sourceCode, {
  // for all options see https://parceljs.org/api.html
  outDir: compiledFolder
})
// once things are bundled, start the server
let firstBuild = true
bundler.on('bundled', (bundle) => {
  if (firstBuild) {
    app.listen(port)
  }
  firstBuild = false
  console.log(`listening on http://localhost:${port}`)
})
// start the bundling
bundler.bundle()
