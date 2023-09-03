import axios from "axios"

export const create_recipient = async (secret, params) => {
    try {
        const response = await axios.post("https://api.paystack.co/transferrecipient", params,
            {
                headers : {
                    "Authorization" : `Bearer ${secret}`,
                    "Content-Type" : "application/json"
                }
            }
        )
        console.log(response.data)

        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const transfer = async (secret, params) => {
    try {
        const response = await axios.post("https://api.paystack.co/transfer", params,
            {
                headers : {
                    "Authorization" : `Bearer ${secret}`,
                    "Content-Type" : "application/json"
                }
            }
        )
        console.log(response.data)

        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const bulk_transfer = async (secret, params) => {
    try {
        const response = await axios.post("https://api.paystack.co/transfer/bulk", params,
            {
                headers : {
                    "Authorization" : `Bearer ${secret}`,
                    "Content-Type" : "application/json"
                }
            }
        )
        console.log(response.data)

        return response.data
    } catch (error) {
        console.log(error)
    }
}