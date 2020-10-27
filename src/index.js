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
const ddd = [
  {
    id: 24,
    createdAt: "2020-10-27T03:12:17.474Z",
    tenant: "anonymous",
    title: "clean room 3",
    list: "main",
    completed: false,
  },
  {
    id: 25,
    createdAt: "2020-10-27T03:12:22.686Z",
    tenant: "anonymous",
    title: "clean room 2",
    list: "main",
    completed: false,
  },
  {
    id: 26,
    createdAt: "2020-10-27T03:13:22.304Z",
    tenant: "esteban",
    title: "test 2",
    list: "main",
    completed: false,
  },
  {
    id: 27,
    createdAt: "2020-10-27T03:13:36.845Z",
    tenant: "esteban",
    title: "test 1",
    list: "main",
    completed: false,
  },
  {
    id: 28,
    createdAt: "2020-10-27T03:14:34.189Z",
    tenant: "esteban",
    title: "start the consolidation",
    list: "work",
    completed: false,
  },
]

app.get("/", async (req, res) => {
  const todos = await prisma.todo.findMany()
  res.json(todos)
})
app.get("/t/:tenant/:list", async (req, res) => {
  const { tenant, list } = req.params
  const todos = await prisma.todo.findMany({
    where: {
      list: list,
      tenant: tenant,
    },
  })
  res.json(todos)
})
app.get("/t/:tenant/", async (req, res) => {
  const { tenant } = req.params
  const todos = await prisma.todo.findMany({
    where: {
      tenant: tenant,
    },
  })
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

app.delete("/t/:tenant", async (req, res) => {
  const { tenant } = req.params
  const todo = await prisma.todo.deleteMany({
    where: {
      tenant: tenant,
    },
  })
  res.json(todo)
})
app.delete("/t/:tenant/:list", async (req, res) => {
  const { tenant, list } = req.params
  const todo = await prisma.todo.deleteMany({
    where: {
      tenant: tenant,
      list: list,
    },
  })
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
