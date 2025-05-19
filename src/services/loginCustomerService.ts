import { CtpClient } from '@/api/CtpClient';

export const loginCustomer = async (email: string, password: string) => {
  const client = new CtpClient().createCustomerClient(email, password);
  try {
    const response = await client
      .me()
      .login()
      .post({ body: { email, password } })
      .execute();
    return response;
  } catch (error) {
    console.error(error);
  }
};
