import { Injectable, Logger } from "@nestjs/common";
import * as crypto from "crypto";
import dns from "dns";
import { KasieErrorHandler } from "src/middleware/errors.interceptor";
const backendUrl =
  "https://kasie-transie-backend-3-854189510560.europe-west1.run.app/api/v1/";
const baseUrl = "https://www.payfast.co.za/onsite/​process";
const passPhrase = "kkTiger3Khaya1";
const merchantId = "23240660";
const merchantKey = "vfeucdz89udzj";

const sandBoxBaseUrl = "https://sandbox.payfast.co.za/onsite/​process";
const sandBoxPassPhrase = "kkTiger3Khaya1";
const sandBoxMerchantId = "10032427";
const sandBoxMerchantKey = "c8vd59c6cores";
const mm = "🔵 🔵 🔵 PayfastService 🔵 ";

@Injectable()
export class PayfastService {
  constructor(private readonly errorHandler: KasieErrorHandler) {}

  public async sendPayment(form: PayfastForm): Promise<any> {
    Logger.debug(
      `\n\n${mm} sending Payfast payment ... 🍎 ${JSON.stringify(form, null, 2)} 🍎 \n`
    );

    let myData = {};
    let myPassphrase = "";
    let payfastUrl = "";

    myData["amount"] = form.amount;
    myData["cancel_url"] = `${backendUrl}payFastCancel`;
    myData["email_address"] = form.email_address;
    myData["item_name"] = form.item_name;
    myData["m_payment_id"] = form.m_payment_id;
    myData["name_first"] = form.name_first;
    myData["name_last"] = form.name_last;
    myData["notify_url"] = `${backendUrl}payFastNotify`;
    myData["return_url"] = `${backendUrl}payFastReturn`;
    // Buyer details

    // Transaction details

    const myEnv = process.env.PAYFAST_SANDBOX;

    if (myEnv === "sandbox") {
      myData["merchant_id"] = sandBoxMerchantId;
      myData["merchant_key"] = sandBoxMerchantKey;
      myPassphrase = sandBoxPassPhrase;
      payfastUrl = sandBoxBaseUrl;
    } else {
      myData["merchant_id"] = merchantId;
      myData["merchant_key"] = merchantKey;
      myPassphrase = passPhrase;
      payfastUrl = baseUrl;
    }
    //myData["passphrase"] = myPassphrase;
    // Generate signature
    let ordered_data = {};
    Object.keys(myData)
      .sort()
      .forEach((key) => {
        ordered_data[key] = myData[key];
      });

    myData = ordered_data;
    Logger.debug(`${mm} ordered data: ${JSON.stringify(myData, null, 2)}`);
    // const hash = await this.generateAPISignature(myData, myPassphrase);
    // myData["signature"] = hash;
    Logger.debug(
      `${mm} check Payfast signature before sending 🍎 ${JSON.stringify(myData, null, 2)} 🍎`
    );
    Logger.log(`${mm} calling payfast: 🔵 🔵 ${payfastUrl} 🔵 🔵`);
    // axios.interceptors.request.use((request) => {
    //   Logger.log(
    //     `${mm} 💖 💖 💖 Starting Request`,
    //     JSON.stringify(request, null, 2)
    //   );
    //   return request;
    // });

    // axios.interceptors.response.use((response) => {
    //   Logger.log(`${mm} 💖 💖 💖 Response:`, JSON.stringify(response, null, 2));
    //   return response;
    // });

    ////const 
    const headers = await this.createPayfastHeaders(myData, merchantId, myPassphrase);
    Logger.debug(`${mm} headers: ${JSON.stringify(headers)}`);
    // Convert myData object to form-urlencoded string
    const formData = new URLSearchParams(myData).toString();
    // Set Content-Type to application/x-www-form-urlencoded
    headers.set('Content-Type', 'application/x-www-form-urlencoded');

    const response = await fetch(payfastUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(myData) // Send form data
    });

    Logger.debug(`${mm} response status: ${response.status}`);
    Logger.debug(`${mm} response statusText: ${response.statusText}`);
    Logger.debug(`${mm} response body: ${response.body}`);

    return await response.json();
  }

 async createPayfastHeaders(data: any, merchant_id: string, passphrase: string) {
    // remember live and sandbox merchant_id and passphrase are different
 
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
  
    const sig = await this.generateAPISignature(data, passPhrase);
    req_headers.set("signature", sig)
    req_headers.append("Content-Type", "application/json") // <- important
    
    Logger.log(`💖 💖 💖 Payfast req_headers:`, JSON.stringify(req_headers, null, 2));
  
    return req_headers
  }
  // // 
  // Signature generation
  private async generateAPISignature(data, passphrase: string) {
    // Arrange the array by key alphabetically for API calls
    
    // Create the get string
    let getString = "";
    for (let key in data) {
      getString +=
        key + "=" + encodeURIComponent(data[key]).replace(/%20/g, "+") + "&";
    }

    // Remove the last '&'
    getString = getString.substring(0, getString.length - 1);
    if (passPhrase !== null) {
      getString += `&passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, "+")}`;
    }

    // Hash the data and create the signature
    // const hash = crypto.createHash("md5").update(getString).digest("hex");
    const hash = (crypto as any)
      .createHash("md5")
      .update(getString)
      .digest("hex");
    Logger.debug(`${mm} returning api signature hash: ${hash}`);
    return hash;
  }

  public validateSignature(pfData, pfParamString, pfPassphrase = null) {
    // Calculate security signature
    let tempParamString = "";
    if (pfPassphrase !== null) {
      pfParamString += `&passphrase=${encodeURIComponent(pfPassphrase.trim()).replace(/%20/g, "+")}`;
    }

    const signature = (crypto as any)
      .createHash("md5")
      .update(pfParamString)
      .digest("hex");

    return pfData["signature"] === signature;
  }

  async ipLookup(domain) {
    return new Promise((resolve, reject) => {
      dns.lookup(domain, { all: true }, (err, address, family) => {
        if (err) {
          reject(err);
        } else {
          const addressIps = address.map(function (item) {
            return item.address;
          });
          resolve(addressIps);
        }
      });
    });
  }

  async pfValidIP(req) {
    const validHosts = [
      "www.payfast.co.za",
      "sandbox.payfast.co.za",
      "w1w.payfast.co.za",
      "w2w.payfast.co.za",
    ];

    let validIps = [];
    const pfIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    try {
      for (let key in validHosts) {
        const ips = (await this.ipLookup(validHosts[key])) as string[]; // Type assertion
        validIps = [...validIps, ...ips];
      }
    } catch (err) {
      console.error(err);
    }

    const uniqueIps = [...new Set(validIps)];

    if (uniqueIps.includes(pfIp)) {
      return true;
    }
    return false;
  }

  isStringArray(value: unknown): value is string[] {
    return (
      Array.isArray(value) && value.every((item) => typeof item === "string")
    );
  }
}

export interface PayfastForm {
  amount: number;
  item_name: string;
  merchant_id: string;
  merchant_key: string;
  name_first: string;
  name_last: string;
  email_address: string;
  m_payment_id: string;
  associationId: string;
}

export interface PayfastPayload {
  m_payment_id: string;
  pf_payment_id: string;
  payment_status: string;
  item_name: string;
  item_description: string;
  amount_gross: number;
  amount_fee: number;
  amount_net: number;
  custom_str1: string;
  custom_str2: string;
  custom_str3: string;
  name_first: string;
  name_last: string;
  email_address: string;
  merchant_id: string;
  signature: string;
}
