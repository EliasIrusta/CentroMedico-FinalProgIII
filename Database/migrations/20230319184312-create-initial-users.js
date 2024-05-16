/* eslint-disable no-unused-vars */
const mongodb = require('mongodb')

const { ObjectId } = mongodb

const initialUsers = [
  {
    _id: new ObjectId('000000000000000000000000'),
    email: 'a@a.com',
    password: '$2b$10$gnEvKoS1gaOe74SAlLgDR.vm61kiuIjh6dcYlX6J/6OgJ/qtUka7e', // 1234
    firstName: 'Admin',
    lastName: 'admin',
    role: new ObjectId('000000000000000000000000'), // Admin
    isActive: true,
    phone: '3216544',
    dni: '12324',
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0,
  },

  {
    _id: new ObjectId('000000000000000000000001'),
    email: 'elias@i.com',
    password: '$2b$10$C.OkddzdHZOC63uSVa9GNOcwtNqGN9kUILwrIInqfBz0xza8opwFq', // 1234
    firstName: 'Elias',
    lastName: 'Irusta',
    role: new ObjectId('000000000000000000000003'), // paciente
    phone: '3834597056',
    dni: '36289480',
    bornDate: new Date(1991, 7, 26),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0,
  },
  {
    _id: new ObjectId('000000000000000000000002'),
    email: 'm@m.com',
    password: '$2b$10$ZxQJzWLjV0OEE3gK9h2EOuFM/b8ESC/GFK63DFiKBehWPzJKXKqoq', // 1234
    firstName: 'dr',
    lastName: 'hibert',
    especialidad: 'clinico',
    phone: '(+598) 2204 5199',
    dni: '321654',
    role: new ObjectId('000000000000000000000002'), // medico
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0,
  },
]

module.exports = {
  async up(db, client) {
    await db.collection('users').insertMany(initialUsers)
  },

  async down(db, client) {
    await db.collection('users').deleteMany({
      _id: {
        $in: initialUsers.map((user) => user._id),
      },
    })
  },
}
