const { Client } = require('pg')

//connect to the smartbankdb
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

//create a new account function

const createNewAccount = ({ account_id, account_name, balance }, onCreate = undefined) => {
    client.query(`insert into account values ($1, $2, $3)`, [account_id, account_name, balance], (err, res) => {
        if (err) console.log(`\n ❌ Problem In Creating the Customer`)
        else {
            console.log(`\n ✅ New Customer Created Successfully`)
            if (onCreate) onCreate(`✅ New Customer Created Successfully`)
        }
    })
}