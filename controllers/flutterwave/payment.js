import axios from "axios"

export const transaction_fee = async (secret, amount, currency) => {
    try {
        const response = await axios.get(`https://api.flutterwave.com/v3/transactions/fee?amount=${amount}&currency=${currency}`,
            {
                headers : {
                    "Authorization" : `Bearer ${secret}`
                }
            }
        )
        console.log(response.data)

        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const init_payment = async (secret, params) => {
    try {
        const response = await axios.post("https://api.flutterwave.com/v3/payments", params,
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

export const beneficiary = async (secret, params) => {
    try {
        const response = await axios.post("https://api.flutterwave.com/v3/beneficiaries", params,
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

export const verify_payment = async (secret, ref) => {
    try {
        const response = await axios.get(`https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${ref}`,
            {
                headers : {
                    "Authorization" : `Bearer ${secret}`
                }
            }
        )
        console.log(response.data)

        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const banks = async (secret, country) => {
    try {
        const response = await axios.get(`https://api.flutterwave.com/v3/banks/${country}`,
            {
                headers : {
                    "Authorization" : `Bearer ${secret}`
                }
            }
        )
        console.log(response.data)

        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const branches = async (secret, id) => {
    try {
        const response = await axios.get(`https://api.flutterwave.com/v3/banks/${id}/branches`,
            {
                headers : {
                    "Authorization" : `Bearer ${secret}`
                }
            }
        )
        console.log(response.data)

        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const transfer_fee = async (secret, amount, currency) => {
    try {
        const response = await axios.get(`https://api.flutterwave.com/v3/transfers/fee?amount=${amount}&currency=${currency}`,
            {
                headers : {
                    "Authorization" : `Bearer ${secret}`
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
        const response = await axios.post("https://api.flutterwave.com/v3/transfers", params,
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