const fs = require('fs')
const path = require('path')
const esConnection = require('./connection')

async function readAndInsertBooks() {
  try {

    await esConnection.resetIndex()
    let files = fs.readdirSync('./books')
    console.log(files)
    for(let file of files) {
      console.log(`Reading file - ${file}`)
      const filePath = path.join('./books', file)
      const paragraphs = parseBookFile(filePath)
      console.log(paragraphs.length)
      await insertBookData(file, paragraphs)
    }
  } catch(err) {
    console.log(err)
  }
}

readAndInsertBooks()

function parseBookFile(filePath) {
  const book = fs.readFileSync(filePath, 'utf8')
  // console.log(book)
  const paragraphs = book
    .split(/\n\s+\n/g)
    .map(line => line.replace(/\r\n/g, '').trim())
    .map(line => line.replace(/_/g, ''))
    .filter((line) => (line && line !== ''))

  console.log(`Parsed ${paragraphs.length} Paragraphs\n`)
  return paragraphs
}

async function insertBookData(file, paragraphs) {
  let bulkOps = []

  for(let i = 0; i < paragraphs.length; i++) {
    bulkOps.push({ index: { _index: esConnection.index, _type: esConnection.type }})
    bulkOps.push({ 
      author: 'J.R.R Tolkien',
      title: file.slice(3, -4),
      location: i,
      text: paragraphs[i]
    })

    if(i > 0 && i % 500 === 0) {
      await esConnection.client.bulk({ body: bulkOps })
      bulkOps = []
      console.log(`Indexed Paragraphs ${i-499} - i`)
    }
  }

  await esConnection.client.bulk({ body: bulkOps })
  console.log(`Indexed Paragraphs ${paragraphs.length - (bulkOps.length / 2)} - ${paragraphs.length}\n\n`)
}