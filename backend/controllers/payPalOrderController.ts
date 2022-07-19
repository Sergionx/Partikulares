import axios from "axios";
import { Request, Response } from "express";
import { getPaypalAccesToken } from "../utils/getPaypalAccessToken";

async function createOrder(req: Request, res: Response) {
  const { products } = req.body;

  try {
    //FIXME - order items
    const order: {
      intent: string;
      purchase_units: {
        description: string;
        soft_descriptor: string;
        amount: {
          currency_code: string;
          value: string;
          breakdown: {
            item_total: { currency_code: string; value: string };
          };
        };
        items: {
          name: string;
          description: string;
          unit_amount: { currency_code: string; value: string };
          quantity: string;
        }[];
      }[];
      application_context: any;
    } = {
      intent: "CAPTURE",
      purchase_units: [
        {
          description: "Some description",
          soft_descriptor: "Great description 1",
          amount: {
            currency_code: "USD",
            value: "0.00",
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: "0.00",
              },
            },
          },
          items: [],
        },
      ],
      application_context: {
        brand_name: "Partikulares",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: `${process.env.HOST}/api/orders/paypal/capture`,
        cancel_url: `${process.env.HOST}/api/orders/paypal/cancel`,
      },
    };

    let total = 0;
    products.forEach(
      (p: {
        product: { title: string; description: string; price: number };
        quantity: number;
      }) => {
        order.purchase_units[0].items.push({
          name: p.product.title,
          description: p.product.description,
          unit_amount: {
            currency_code: "USD",
            value: p.product.price.toString(),
          },
          quantity: p.quantity.toString(),
        });

        total += p.product.price * p.quantity;
      }
    );

    const accessToken = await getPaypalAccesToken();
    order.purchase_units[0].amount.breakdown.item_total.value =
      total.toString();
    order.purchase_units[0].amount.value = total.toString();

    console.log(order.purchase_units[0].items);

    const response = await axios.post(
      `${process.env.PAYPAL_API_URL}/v2/checkout/orders`,
      order,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log(response.data);
    res.send(response.data);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
}

async function captureOrder(req: Request, res: Response) {
  try {
    const { token, PayerID } = req.query;

    const accessToken = await getPaypalAccesToken();

    const { data } = await axios.post(
      `${process.env.PAYPAL_API_URL}/v2/checkout/orders/${token}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log(data);
    res.send(data);
    //return res.redirect("") TODO - Redirect to order success page
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
}

async function cancelOrder(req: Request, res: Response) {
  try {
    res.redirect(`${process.env.FRONTEND_URL}/shop`);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
}

export { createOrder, captureOrder, cancelOrder };
