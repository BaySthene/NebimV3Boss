/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://docs.infinite.red/ignite-cli/boilerplate/app/services/#backend-api-integration)
 * documentation for more details.
 */
import { ApiResponse, ApisauceInstance, create } from "apisauce"
import Config from "../../../config"
import { GeneralApiProblem, getGeneralApiProblem } from "../apiProblem"
import type { ApiConfig, ApiFeedResponse } from "../api.types"
import type { EpisodeSnapshotIn } from "app/models/Episode"
import { UserCheck } from "app/services/api/auth/authController.types"
import { useStores } from "app/models"

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


  async getAccessToken(username?:string, password?:string): Promise<any> {
    const {
      authenticationStore: { accessToken, expiresIn, refreshToken, grantType },
    } = useStores()

    console.log({ accessToken, expiresIn, refreshToken, grantType })
    if(!refreshToken && grantType === 'client_credentials'){
      const response: any = await this.apisauce.post("/connect/token", {
        grant_type: "client_credentials",
        client_id: "app.client",
      })
      return response.data.access_token
    }
    if(refreshToken) {
      const expiryDate = expiresIn ? new Date(expiresIn) : null

      if (accessToken && expiryDate && expiryDate > new Date()) {
        return accessToken
      }else{
        return await this.refreshToken()
      }
    }

  }


  async refreshToken(): Promise<string | null> {
    const {
      authenticationStore: { refreshToken, setRefreshToken, setAccessToken, setExpireIn },
    } = useStores()

    if (!refreshToken) return null

    const response: ApiResponse<any> = await this.apisauce.post("/connect/token", {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: "app.client",
    })

    /* if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return null
    } */

    // If successful, store the new access token and refresh token
    // eslint-disable-next-line camelcase
    const { access_token, refresh_token, expires_in } = response.data
    setAccessToken(access_token)
    setRefreshToken(refresh_token)
    // eslint-disable-next-line camelcase
    setExpireIn('expires_in', new Date(Date.now() + expires_in * 1000).toString())
    // eslint-disable-next-line camelcase
    return access_token
  }

  /**
   * Gets a list of recent React Native Radio episodes.
   */
  async IsHaveAccount(TaxId:string, Email:string): Promise<any> {

    // make the api call
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

    return { exists: response.data.exists, accessToken: token, grantType: 'client_credentials'}

  }

}

// Singleton instance of the API for convenience
export const authController = new AuthController()
