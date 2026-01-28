import jwt from 'jsonwebtoken';
import axios from 'axios';

interface IDP {
  Host: string;
  Callback: string;
  ID: string;
  Secret: string;
}

interface IDToken {
  id_token: string;
}

// 定义一个类型来表示JWT的声明
interface JWTClaims {
  [key: string]: any;
}

// 异步函数来获取IDP的声明
export async function fetchClaimsFromIDP(
  code: string,
  conf: IDP,
  token?: string
): Promise<JWTClaims | null> {
  try {
    let idToken = token || '';
    if (!token) {
      const rawURL = `${conf.Host}/sso/oidc/token?grant_type=authorization_code&code=${code}&redirect_uri=${conf.Callback}&client_id=${conf.ID}&client_secret=${conf.Secret}`;
      const response = await axios.get(rawURL);
      console.log('response: ', response);
      const value: IDToken = response.data;
      idToken = value.id_token;
    }

    const decoded = jwt.decode(idToken, { complete: true }) as {
      header: any;
      payload: JWTClaims;
      signature: string;
    };

    if (decoded.header.alg === 'HS256') {
      return decoded.payload;
    } else {
      throw new Error('unexpected signing method');
    }
  } catch (err: any) {
    throw new Error(err);
  }
}
