import fetch from "node-fetch";

const config = useRuntimeConfig()

const API_KEY = config.yookassaKey != 'YOOKASSA_KEY' ? config.yookassaKey : '396644:test_r7OU2oCZFR0HQPEWIvGkZMdB526J3kN0N_NPy2dYwSA';

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

    console.log(body)

    const url = 'https://api.yookassa.ru/v3/payments';
	const credentials = API_KEY;
	const auth = Buffer.from(credentials).toString('base64');
    const idempotenceKey = Math.random();

    const parsedObj = JSON.parse(body.meta.items_obj)
    const order_obj = Object.values(parsedObj)[0]
    const order_name = order_obj.order_item_name
    const order_items = order_obj.meta.guests
    const order_prices = order_obj.meta.price_arr.clear

    const buildItems = () => {
        const result = []
        Object.keys(order_items).forEach(key => {
            if (order_items[key] > 0) {
                result.push({
                    "description": `Тур «${order_name}» | ${key == 64 ? 'Детский' : 'Взрослый'}`,
                    "quantity": `${order_items[key]}.00`,
                    "amount": {
                        "value": `${order_prices[key]}.00`,
                        "currency": "RUB"
                    },
                    "vat_code": "1",
                    "payment_mode": "full_prepayment",
                    "payment_subject": "service"
                })
            }
        })
    }

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
        metadata: {
            ...body.meta,
        },
        "receipt": {
            "customer": {
                "full_name": body.meta.first_name + ' ' + body.meta.first_name,
                "phone": body.meta.phone,
                "email": body.email
            },
            "items": buildItems(),
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



