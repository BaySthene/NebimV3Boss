import type { ApiConfig } from "app/services/api"
import Config from "app/config"
import { ApiResponse, ApisauceInstance, create } from "apisauce"

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_WIDGET_URL,//'http://83.150.214.138:18503',//Config.API_WIDGET_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class WidgetController {
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

  async getWelcomeBannerData(accessToken: string, taxId: string) : Promise<any> {
    const payload = {
      taxId: taxId,
    };
    try {
      return await this.apisauce.get(
        `/api/widget/getwelcomebannerdatafromcompanydatabase`,
        payload,
        { headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` } }
      );
    }catch (e) {
      const error = "Widget bilgileri çekilirken bir hata ile karşılaşıldı sunucuya erişim olmayabilir.";
      return error;
    }


  }


}

export const widgetController = new WidgetController()
