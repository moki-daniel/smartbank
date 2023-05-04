const readline = require("readline");
const {
    createNewAccount,
    deposit,
    withdraw,
    balance,
    transfer,
} = require("./db");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log("🙏 Welcome To Banking App 🙏");
console.log("\n 1. Create new account");
console.log("\n 2. Deposit Money");
console.log("\n 3. Withdraw Money");
console.log("\n 4. Check Balance");
console.log("\n 5. Transfer Money");
console.log("\n 6. Exit");

const ip = (msg) =>
    new Promise((resolve, reject) => {
        rl.question(`\n 👉 ${msg} : `, (ch) => {
            resolve(ch);
        });
    });

const start = async() => {
    while (true) {
        const choice = await ip("Enter Your Choice");

        if (choice == 1) {
            console.log(`\n ✅ Create Account`);
            const account_id = parseInt(await ip("Enter Account Id"));
            const account_name = await ip("Enter Account Name");
            const balance = 0;
            createNewAccount({ account_id, account_name, balance });
        } else if (choice == 2) {
            console.log(`\n ✅ Deposit Money`);

            const account_id = parseInt(await ip("Enter Account Id"));
            const amount = parseFloat(await ip("Enter Amount"));

            deposit({ account_id, amount });
        } else if (choice == 3) {
            console.log(`\n ✅ Withdraw Money`);

            const account_id = parseInt(await ip("Enter Account Id"));
            const amount = parseFloat(await ip("Enter Amount"));

            withdraw({ account_id, amount });
        } else if (choice == 4) {
            console.log(`\n ✅ Check Balance`);
            const account_id = parseInt(await ip("Enter Account Id"));
            balance(account_id);
        } else if (choice == 5) {
            console.log(`\n ✅ Please Transfer Money`);
            const srcId = parseInt(await ip("Enter Source Account Id"));
            const destId = parseInt(await ip("Enter Destination Account Id"));
            const amount = parseFloat(await ip("Enter Amount"));

            transfer({ srcId, destId, amount });
        } else {
            console.log(`Bye Bye`);
            process.exit();
        }
    }
};

start();