export interface Scopes {
  [key: string]: string;
}

export interface SecurityScheme {
  type: 'http' | 'apiKey' | 'oauth2' | 'openIdConnect';
  scheme?: 'basic' | 'bearer';
  openIdConnectUrl?: string;
  flows?: {
    authorizationCode?: {
      authorizationUrl: string;
      tokenUrl: string;
      scopes: Scopes;
    };
    clientCredentials?: {
      tokenUrl: string;
      scopes: Scopes;
    };
  };
}

export interface SecuritySchemes {
  [key: string]: SecurityScheme // key = security scheme name
}

export function bearerScheme(): SecurityScheme {
  return {
    type: 'http',
    scheme: 'bearer'
  }
}

export function openIdScheme(connectUrl: string = '/.well-known/openid-configuration'): SecurityScheme {
  return {
    type: 'openIdConnect',
    openIdConnectUrl: connectUrl
  }
}

export function oauth2Scheme(scopes: Scopes, clientCredentials: boolean = false, authorizationUrl: string = '/oauth2/authorize', tokenUrl: string = '/oauth2/token'): SecurityScheme {
  return {
    type: 'oauth2',
    flows: {
      authorizationCode: { authorizationUrl, tokenUrl, scopes },
      ...(clientCredentials ? { clientCredentials: { tokenUrl, scopes } } : {})
    }
  }
}