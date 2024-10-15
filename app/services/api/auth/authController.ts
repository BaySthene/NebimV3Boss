/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://docs.infinite.red/ignite-cli/boilerplate/app/services/#backend-api-integration)
 * documentation for more details.
 */
import { ApiResponse, ApisauceInstance, create } from "apisauce"
import Config from "../../../config"
import type { ApiConfig } from "../api.types"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class AuthController {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
    })
  }


  async getAccessToken(): Promise<any> {
      const response: any = await this.apisauce.post("/connect/token", {
        grant_type: "client_credentials",
        client_id: "app.client",
      })
      return response.data.access_token
  }


 /* async refreshToken(): Promise<string | null> {

    if (!refreshToken) return null

    const response: ApiResponse<any> = await this.apisauce.post("/connect/token", {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: "app.client",
    })
    // eslint-disable-next-line camelcase
    const { access_token, refresh_token, expires_in } = response.data
    setAccessToken(access_token)
    setRefreshToken(refresh_token)
    // eslint-disable-next-line camelcase
    setExpireIn('expires_in', new Date(Date.now() + expires_in * 1000).toString())
    // eslint-disable-next-line camelcase
    return access_token
  } */

  /**
   * Gets a list of recent React Native Radio episodes.
   */
  async IsHaveAccount(TaxId:string, Email:string): Promise<any> {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // make the api call
    if (TaxId?.length !== 10 && TaxId?.length !== 11) return { exists: false, error: 'VKN / TCKN 10 veya 11 karakterden oluşmalı' };
    if(!emailRegex.test(Email)) return { exists: false, error: 'E-posta adresini doğru girmelisiniz.' };
    const token = await this.getAccessToken()
    if (!token) return { kind: "unauthorized" }
    const payload = {
      taxId: TaxId,
      email: Email
    };

    const response: ApiResponse<any> = await this.apisauce.post(
      `/api/user/checkuser`,
      payload,
      { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
    );
    if(!response.ok) return { kind: "unauthorized" }

    return { exists: response.data.exists, userId: response.data.id, accessToken: token, grantType: 'client_credentials'}
  }

  async GetUserPreInfo(authToken?: string,userId?: string): Promise<any> {

    let token;
    if(!authToken){
      token = await this.getAccessToken()
      if (!token) return { kind: "unauthorized" }
    }else {
      token = authToken
    }

    if(!userId) return { kind: "forbidden" }
    console.log(userId);
    const payload = {
      id: userId,
    };
    const response: ApiResponse<any> = await this.apisauce.get(
      `/api/user/getuserpreinfo`,
      payload,
      { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
    );

    return response.data


  }

  async PostRegister(authToken: unknown, authFirstName: unknown, authLastName: unknown, authPassword: string, authEmail: string, authTaxId: unknown) : Promise<any> {
    let token;
    if(!authToken){
      token = await this.getAccessToken()
      if (!token) return { kind: "unauthorized" }
    }else {
      token = authToken
    }
    const payload = {
      UserName: authEmail,
      Email: authEmail,
      TaxId: authTaxId,
      FirstName: authFirstName,
      LastName: authLastName,
      Password: authPassword
    };
    const response: ApiResponse<any> = await this.apisauce.post(
      `/api/user/signup`,
      payload,
      { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
    );
    if(response.data.isRegister) {
      return await this.PostLogin(authPassword, authEmail);
    }else {
      return response.data;
    }
  }

  async PostLogin(authPassword: string, authEmail: string) : Promise<any> {
    const response: any = await this.apisauce.post("/connect/token", {
      grant_type: "password",
      client_id: "app.client",
      username: authEmail,
      password: authPassword
    })
    if(response.data.access_token){
      const userInfo: any = await this.apisauce.post("/connect/userinfo", {
        grant_type: "client_credentials",
        client_id: "app.client",
      }, { headers: { "Content-Type": "application/json", Authorization: `Bearer ${response.data.access_token}` } })
      if(!userInfo.data.sub) return { kind: "unauthorized" }
      return {
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
        expire_in: response.data.expire_in,
        userId: userInfo.data.sub,
        avatar: userInfo.data.avatar,
        fullName: `${userInfo.data.given_name} ${userInfo.data.family_name}`,
      };
    }else {
      if(!response.data.access_token) return { kind: "unauthorized" }
    }
  }
}

// Singleton instance of the API for convenience
export const authController = new AuthController()
