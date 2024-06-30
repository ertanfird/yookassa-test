import fetch from "node-fetch";

const config = useRuntimeConfig()

const API_KEY = config.yookassaKey || '396644:test_r7OU2oCZFR0HQPEWIvGkZMdB526J3kN0N_NPy2dYwSA';

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

    console.log(body)

    const url = 'https://api.yookassa.ru/v3/payments';
	const credentials = API_KEY;
	const auth = Buffer.from(credentials).toString('base64');
    const idempotenceKey = Math.random();

	const data = {
        amount: {
            value: body.amount,
            currency: "RUB"
        },
        payment_method_data: {
            type: 'bank_card'
        },
        capture: true,
        confirmation: {
            type: 'redirect',
            return_url: body.return_url
        },
        description: body.description,
        // metadata: {
        //     ...body.meta,
        // },
        "receipt": {
            "customer": {
                "email": body.email
            },
            "items": [
            {
				"description": 'Ай-Петри',
				"quantity": 1.00,
				// "price": item.price + ".00",
				"amount": {
					"value": body.amount + ".00",
					"currency": "RUB"
				},
				"vat_code": "1",
				"payment_mode": "full_prepayment",
				"payment_subject": "commodity"
            }],
        }
    };

	console.log(JSON.stringify(data));

    const result = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
            'Authorization': `Basic ${auth}`,
            'Idempotence-Key': idempotenceKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)

    return result;
});



