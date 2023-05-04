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

// createNewAccount({
//     account_id: 2,
//     account_name: "Tinah",
//     balance: 200000000

// })


//withdraw query

const withdraw = ({ account_id, amount }, onWithdraw = undefined) => {
        client.query(`select balance from account where account_id= $1`, [account_id], (err, res) => {
            if (err) {
                console.log(`\n ❌ Problem In Withdrawing`)
            } else {
                const balance = parseFloat(res.rows[0].balance)

                const newBalance = balance - parseFloat(amount)

                client.query(`update account set balance = $1 where account_id = $2`, [newBalance, account_id], (err, res) => {
                    if (err) console.log(`\n ❌ Problem In Withdrawing`)
                    else {
                        console.log(`\n ✅ ksh ${amount} Withdrawal Successfully`)
                        if (onWithdraw) onWithdraw(`✅ ksh ${amount} Withdraw Successfully`)
                    }
                })
            }
        })
    }
    //withdraw test code

// withdraw({
//     account_id: 1,
//     amount: 2439398000
// })

//Deposit query function

const deposit = ({ account_id, amount }, onDeposit = undefined) => {
    client.query(`select balance from account where account_id = $1`, [account_id], (err, res) => {
        if (err) {
            console.log(`\n ❌ Problem In Deposit`)
        } else {
            const balance = parseFloat(res.rows[0].balance)
            const newBalance = balance + parseFloat(amount)

            client.query(`update account set balance = $1 where account_id = $2`, [newBalance, account_id], (err, res) => {
                if (err) console.log(`\n ❌ Problem In Depositing`)
                else {
                    console.log(`\n ✅ Amount ${amount} Deposited Successfully`)

                    if (onDeposit) onDeposit(`✅ Amount ${amount} Deposited Successfully`)
                }
            })
        }
    })
}

//deposit test code
// deposit({
//     account_id: 1,
//     amount: 10000
// })

//transfer query function
const transfer = ({ srcId, destId, amount }, onTransfer = undefined) => {
        withdraw({ account_id: srcId, amount }, msgWd => {
            deposit({ account_id: destId, amount }, msgDp => {
                if (onTransfer) onTransfer(`✅ Amount ${amount} Transferred Successfully`)
            })
        })
    }
    //     //test transfer
    // transfer({
    //     srcId: 1,
    //     destId: 2,
    //     amount: 5000
    // })

//balance query function

const balance = (account_id, onBalance = undefined) => {
        console.log(account_id)
        client.query(`select balance from account where account_id = $1`, [account_id], (err, res) => {
            if (err) {
                console.log(`\n ❌ Problem In Fetching the balance`)
                console.log(err)
            } else {
                const balance = parseFloat(res.rows[0].balance)
                console.log(`\n 💰 Your Account Balance Is : ${balance}`)
                if (onBalance) onBalance(balance)
            }
        })
    }
    //test code for balance function
    // balance(2)

module.exports = {
    createNewAccount,
    deposit,
    withdraw,
    transfer,
    balance
}