import { Logger } from "@nestjs/common"
import * as crypto from "crypto";

export function createPayfastHeaders(data: any, merchant_id: string, passphrase: string) {
  // remember live and sandbox merchant_id and passphrase are different
  data = {
    ...data,
    passphrase,
  }

  const headers = {
    "merchant-id": merchant_id,
    "version": "v1",
    "timestamp": (new Date()).toISOString().split('.')[0],
    "signature": ""
  }

  const req_headers = new Headers()
  Object.keys(headers).forEach(key => {
    req_headers.append(key, headers[key])
  })

  const signature_data = {...data, ...headers}
  let signature_uri = "";
  Object.keys(signature_data).sort().forEach(key => {
    if (key !== "signature") {
      signature_uri += `${key}=${encodeURIComponent(signature_data[key]).replace(/%20/g, '+')}&`
    }
  });

  // Remove the last '&'
  signature_uri = signature_uri.substring(0, signature_uri.length - 1);

  const signature = crypto.createHash("md5").update(signature_uri).digest("hex");
  req_headers.set("signature", signature)
  req_headers.append("Content-Type", "application/json") // <- important
  
  Logger.log(`💖 💖 💖 Payfast req_headers:`, JSON.stringify(req_headers, null, 2));

  return req_headers
}
// // Example on how to use it:

// async function createRefund(payment_id, refund_params) {
//   const headers = createPayfastHeaders(refund_params)

//   const url = `https://api.payfast.co.za/refunds/${payment_id}?testing=true`; // <- add testing true for sandbox testing
//   const response = await fetch(url, {
//     method: "POST",
//     headers: headers,
//     body: JSON.stringify(refund_params)
//   });

//   return await response.json();
// }

// const refund = await createRefund("2120314", {
//   amount: 1000,
//   reason: "stock",
//   notify_buyer: 0
// });