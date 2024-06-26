import fetch from "node-fetch";

const API_KEY = 'test_r7OU2oCZFR0HQPEWIvGkZMdB526J3kN0N_NPy2dYwSA';

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

    console.log(body)

    return body
	// const items = JSON.parse(body.meta.items);
    // const url = 'https://api.yookassa.ru/v3/payments';
	// const credentials = API_KEY(body.yakassa);
	// const auth = Buffer.from(credentials).toString('base64');
    // const idempotenceKey = Math.random();



	// const convertItems = () => {
	// 	const result = [];

	// 	items.forEach(item => {
	// 		result.push({
	// 			"description": item.name,
	// 			"quantity": item.count,
	// 			// "price": item.price + ".00",
	// 			"amount": {
	// 				"value": item.total_cost - body.meta.promo + ".00",
	// 				"currency": "RUB"
	// 			},
	// 			"vat_code": "1",
	// 			"payment_mode": "full_prepayment",
	// 			"payment_subject": "commodity"
	// 		});
	// 	});

	// 	if (body.yakassa === 'msk' && body.meta.deliveryprice*1 > 0) {
	// 		result.push({
	// 			"description": "Доставка",
	// 			"quantity": "1",
	// 			// "price": body.meta.deliveryprice + ".00",
	// 			"amount": {
	// 				"value": body.meta.deliveryprice + ".00",
	// 				"currency": "RUB"
	// 			},
	// 			"vat_code": "1",
	// 			"payment_mode": "full_prepayment",
	// 			"payment_subject": "service"
	// 		});
	// 	}

	// 	return result;
	// };

	// const data = {
    //     amount: {
    //         value: body.price,
    //         currency: body.currency
    //     },
    //     payment_method_data: {
    //         type: 'bank_card'
    //     },
    //     capture: true,
    //     confirmation: {
    //         type: 'redirect',
    //         return_url: `https://visco-plus.ru/order/done/?id=${body.meta.id}`
    //         // return_url: `http://192.168.1.112:3004/order/done/?id=${body.meta.id}`
    //     },
    //     description: body.description,
    //     metadata: {
    //         ...body.meta,
    //     },
    //     "receipt": {
    //         "customer": {
    //             "email": body.meta.email
    //         },
    //         "items": convertItems(),
    //     }
    // };

	// console.log(JSON.stringify(data));

    // const result = await fetch(url, {
    //     method: "POST",
    //     mode: "cors",
    //     headers: {
    //         'Authorization': `Basic ${auth}`,
    //         'Idempotence-Key': idempotenceKey,
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data)
    // })
    // .then(response => response.json())
    // .then(data => data)
    // .catch(error => error)

    // return result;
});



