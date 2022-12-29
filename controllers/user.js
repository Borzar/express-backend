const userGet = (req, res) => {
  const { query, name = 'no name', apikey, page = 1, limit } = req.query

  res.json({
    msg: 'get API - controller',
    query,
    name,
    apikey,
    page,
    limit,
  })
}

const userPost = (req, res) => {
  const { nombre, edad } = req.body

  res.json({
    msg: 'post API - controller',
    nombre,
    edad,
  })
}

const userPut = (req, res) => {
  const { id } = req.params

  res.json({
    msg: 'put API - controller',
    id,
  })
}

const userPatch = (req, res) => {
  res.json({
    msg: 'patch API - controller',
  })
}

const userDelete = (req, res) => {
  res.json({
    msg: 'delete API - controller',
  })
}

module.exports = {
  userGet,
  userPost,
  userPut,
  userPatch,
  userDelete,
}
