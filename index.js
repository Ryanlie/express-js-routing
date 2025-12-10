const express = require('express')
const app = express()
const port = 3001

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/tipe/', async (req, res) => {
  const qs = req.query["size"]

  var query
  if (qs) {
    const size = Number.parseInt(qs)
    if (size >= 1) {
      // No. 3
      query = "SELECT * FROM TipeRuangan WHERE kapasitas > " + size + ";"
    } else {
      res.status(400).send("query `size` must be a positive integer")
    }
  } else {
    // No. 1
    query = "SELECT * FROM TipeRuangan;"
  }

  res.send(await sendQuery(query))
})

app.get('/detail/:id', async (req, res) => {
  const id = req.params["id"]
  const number = parseInt(id)

  if (number) {
    // No. 2
    const query = `SELECT * FROM Ruangan LEFT JOIN TipeRuangan ON Ruangan.tipe = TipeRuangan.id_tipe WHERE id_ruangan = ${id};`
    res.send(await sendQuery(query))
  } else {
    res.status(400).send("Invalid ID")
  }
})

app.get('/status/:status', async (req, res) => {
  const status = req.params["status"]


  if (status) {
    // No. 4
    const query = `SELECT * FROM Ruangan ` +
      `WHERE STATUS = ${status}`

    res.send(await sendQuery(query))
  } else {
    res.status(400).send("Invalid query")
  }
})

app.get('/schedule/:date/:start/:end', async (req, res) => {
  const date = req.params["date"]
  const start = Number.parseInt(req.params["start"])
  const end = Number.parseInt(req.params["end"])

  if (date && start && end && end >= start) {
    // No. 5
    const query = `SELECT Ruangan.* FROM Ruangan ` +
      `WHERE NOT EXISTS (` +
      `SELECT 1 FROM Reservasi ` +
      `WHERE Ruangan.id_ruangan = Reservasi.ruangan ` +
      `AND ${date} = Reservasi.tanggal ` +
      `AND ${start} <= jam_mulai ` +
      `AND jam_selesai <= ${end})`

    res.send(await sendQuery(query))
  } else {
    res.status(400).send("Invalid query")
  }
})

app.get('/user/:email', async (req, res) => {
  const email = req.params["email"]

  if (email) {
    // No. 6
    const query = `SELECT * from Pelanggan WHERE email = ${email}`

    res.send(await sendQuery(query))
  } else {
    res.status(400).send("Invalid query")
  }
})

app.get('/reservasi/', async (req, res) => {
  const userID = req.query["user"]
  const dateStart = req.query["start"]
  const dateEnd = req.query["end"]

  if (userID) {
    // No. 8
    const query = `SELECT * from Reservasi WHERE pelanggan = ${userID}`

    res.send(await sendQuery(query))
  } else if (dateStart && dateEnd) {
    // No. 9
    const query = `SELECT * from Reservasi WHERE tanggal >= ${dateStart} AND tanggal <= ${dateEnd}`
    res.send(await sendQuery(query))
  } else {
    // No. 7
    const query = `SELECT * from Reservasi`
    res.send(await sendQuery(query))
  }
})

app.get('/cashflow/:date', async (req, res) => {
  const date = req.params["date"]

  if (date) {
    // No. 10
    const query = `SELECT SUM(jumlah) from Pembayaran WHERE status = success AND tanggal_bayar = ${date}`

    res.send(await sendQuery(query))
  } else {
    res.status(400).send("Tidak ada tanggal dimasukkan")
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

async function sendQuery(query) {
  return {
    "query": query,
    "Placeholder": "TODO"
  }
}
