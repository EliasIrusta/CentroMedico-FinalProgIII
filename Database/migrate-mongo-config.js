/* eslint-disable no-undef */
const env_path = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'
require('dotenv').config({ path: env_path })

const db_url = 'mongodb://mongodb:27017/'//process.env.MONGO_URL || 
const db_name = 'test'//process.env.MONGO_DB || 

module.exports = {
  mongodb: {
    url: db_url + db_name,
    options: {},
  },
  migrationsDir: 'migrations',
  changelogCollectionName: 'changelog',
  migrationFileExtension: '.js',
  useFileHash: false,
}
