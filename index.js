import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import { banks, beneficiary, branches, init_payment, transaction_fee, transfer, transfer_fee, verify_payment } from "./controllers/flutterwave/payment.js"
import { v4 } from "uuid"

dotenv.config()

const { FLUTTERWAVE_SECRET_KEY, PORT } = process.env

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get("/banks/:country", async (req, res) => {
    const bankz = await banks(FLUTTERWAVE_SECRET_KEY, req.params.country)
    const _banks = bankz.data
    
    return res.json({ banks : _banks })
})

app.get("/branches/:id", async (req, res) => {
    const branch = await branches(FLUTTERWAVE_SECRET_KEY, req.params.id)
    const _branch = branch.data
    
    return res.json({ branch : _branch })
})

app.post("/init", async (req, res) => {
    const params = {
        tx_ref : v4(),
        currency : req.body.currency,
        amount : req.body.amount,
        redirect_url : "",
        customer : {
            email : req.body.email
        }
    }

    const payment = await init_payment(FLUTTERWAVE_SECRET_KEY, params)
    const uri = payment.data.link

    return res.json({ uri })
})

app.get("/verify/:ref", async (req, res) => {
    const payment = await verify_payment(FLUTTERWAVE_SECRET_KEY, req.params.ref)

    if(payment.data.status == "successful") {
        return res.send("successful")
    } else {
        return res.send("failed")
    }
})

app.post("/beneficiary", async (req, res) => {
    const params = {
        beneficiary_name : req.body.name,
        account_bank : req.body.bank_code,
        account_number : req.body.number,
        currency : req.body.currency

    }

    const _beneficiary = await beneficiary(FLUTTERWAVE_SECRET_KEY, params)
    const id = _beneficiary.data.id

    return res.json({ id })
})

app.post("/transfer", async (req, res) => {
    const params = {
        account_bank : req.body.code,
        account_number : req.body.number,
        amount : req.body.amount,
        narration : `Withdrawal of funds by ${req.body.username}`,
        currency : req.body.currency,
        reference : req.body.ref,
        callback_url : "https://flw-webhook.netlify.app/"
    }

    const _transfer = await transfer(FLUTTERWAVE_SECRET_KEY, params)
    const data = _transfer.data

    return res.json({ ...data })
})

app.get("/transfer_fee/:amount/:currency", async (req, res) => {
    const fee = await transfer_fee(FLUTTERWAVE_SECRET_KEY, req.params.amount, req.params.currency)
    const data = fee.data[0]

    res.send(`${data.fee}`)
})

app.get("/transaction_fee/:amount/:currency", async (req, res) => {
    const fee = await transaction_fee(FLUTTERWAVE_SECRET_KEY, req.params.amount, req.params.currency)
    const data = fee.data

    res.send(`${data.fee}`)
})

app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`Connection at ${PORT} is successful.`)
})