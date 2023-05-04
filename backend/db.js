const { Client } = require('pg')

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'smartbankdb',
    post: 5432
})

client.connect(err => {
    if (err) {
        console.log(`❌ Error In Connectivity`)
        return
    }
    console.log(`\n ✅ Connected Successfully`)
})