import axios from "axios";

export async function getPaypalAccesToken(): Promise<string>{
  const params = new URLSearchParams({ grant_type: "client_credentials" });
  const {
    data: { access_token },
  } = await axios.post(
    `${process.env.PAYPAL_API_URL}/v1/oauth2/token`,
    params.toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: process.env.PAYPAL_API_CLIENT as string,
        password: process.env.PAYPAL_API_SECRET as string,
      },
    }
  );

  return access_token as string;
}