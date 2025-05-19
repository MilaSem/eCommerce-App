import {
  ClientBuilder,
  PasswordAuthMiddlewareOptions,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/ts-client';

import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

export class CtpClient {
  projectKey: string;
  clientId: string;
  clientSecret: string;
  authUrl: string;
  apiUrl: string;
  scopes: string;

  constructor() {
    this.projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
    this.clientId = import.meta.env.VITE_CTP_CLIENT_ID;
    this.clientSecret = import.meta.env.VITE_CTP_CLIENT_SECRET;
    this.authUrl = import.meta.env.VITE_CTP_AUTH_URL;
    this.apiUrl = import.meta.env.VITE_CTP_API_URL;
    this.scopes = import.meta.env.VITE_CTP_SCOPES;
  }

  private createAuthOptions(): AuthMiddlewareOptions {
    return {
      host: this.authUrl,
      projectKey: this.projectKey,
      credentials: {
        clientId: this.clientId,
        clientSecret: this.clientSecret,
      },
      scopes: [this.scopes],
      httpClient: globalThis.fetch,
    };
  }

  private createPasswordAuthOptions(
    email: string,
    password: string,
  ): PasswordAuthMiddlewareOptions {
    return {
      host: this.authUrl,
      projectKey: this.projectKey,
      credentials: {
        clientId: this.clientId,
        clientSecret: this.clientSecret,
        user: { username: email, password: password },
      },
      httpClient: globalThis.fetch,
    };
  }

  private createHttpOptions(): HttpMiddlewareOptions {
    return {
      host: this.apiUrl,
      httpClient: globalThis.fetch,
    };
  }

  public createClient() {
    const authOptions = this.createAuthOptions();
    const httpOptions = this.createHttpOptions();

    const client = new ClientBuilder()
      .withProjectKey(this.projectKey)
      .withClientCredentialsFlow(authOptions)
      .withHttpMiddleware(httpOptions)
      .build();

    return createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: this.projectKey,
    });
  }

  public createCustomerClient(email: string, password: string) {
    const authOptions = this.createPasswordAuthOptions(email, password);
    const httpOptions = this.createHttpOptions();

    const client = new ClientBuilder()
      .withProjectKey(this.projectKey)
      .withPasswordFlow(authOptions)
      .withHttpMiddleware(httpOptions)
      .build();

    return createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: this.projectKey,
    });
  }
}
