export async function listUsers(req, res, next) {
  res.status(200).json({
    results: [], // To do: ouptut JSON according to the User schema
    totalCount: 0
  })
}

export const createUser = [
  async (req, res, next) => { next(); },
  async (req, res, next) => { res.status(200).json({}) }, // To do: ouptut JSON according to the User schema
]

export async function getUser(req, res, next) {
  res.status(200).json({}) // To do: ouptut JSON according to the User schema
}

export async function updateUser(req, res, next) {
  res.status(200).json({}) // To do: ouptut JSON according to the User schema
}

export async function deleteUser(req, res, next) {
  res.status(200).json({})
}