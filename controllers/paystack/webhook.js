import { createHmac } from "crypto"
import axios from "axios"

export const validate_sig = async (secret, content, sig) => {
    const hash = await createHmac("sha512", secret).update(JSON.stringify(content)).digest("hex")

    return hash == sig ? true : false
}

export const event_handler = async (content) => {
    console.log(content)
    if(content.event == "transfer.failed") {
        return "Transfer Failed"
    } else if(content.event == "transfer.success") {
        return "Transfer Successful"
    } else if(content.event == "transfer.reversed") {
        return "Transfer Reversed"
    } else if(content.event == "paymentrequest.pending") {
        return "Payment Pending"
    } else if(content.event == "paymentrequest.success") {
        return "Payment Succesful"
    }
}