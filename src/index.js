const express = require("express")
const bodyParser = require("body-parser")
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()
const app = express()

app.use(bodyParser.json())
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Content-Type")
  next()
})

app.get("/", async (req, res) => {
  const todos = await prisma.todo.findMany()
  res.json(todos)
})

app.get("/:id", async (req, res) => {
  const { id } = req.params
  const todo = await prisma.todo.findOne({
    where: {
      id: parseInt(id),
    },
  })
  res.json(todo)
})

app.post("/", async (req, res) => {
  const { title, tenant = "anonymous", list = "main" } = req.body
  const result = await prisma.todo.create({
    data: {
      title,
      tenant,
      list,
    },
  })
  res.json(result)
})
const update = async (req, res) => {
  const { id } = req.params
  const todo = await prisma.todo.update({
    where: {
      id: parseInt(id),
    },
    data: req.body,
  })
  res.json(todo)
}
app.patch("/:id", (req, res) => update(req, res))
app.put("/:id", (req, res) => update(req, res))

app.delete("/", async (req, res) => {
  const todo = await prisma.todo.deleteMany()
  res.json(todo)
})
app.delete("/:id", async (req, res) => {
  const { id } = req.params
  const todo = await prisma.todo.delete({
    where: {
      id: parseInt(id),
    },
  })
  res.json(todo)
})

const port = process.env.PORT || 3000
const server = app.listen(port, () =>
  console.log(`🚀 Server ready at: http://localhost:${port}`)
)
