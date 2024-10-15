import { useEffect, useState } from "react"
import { authController } from "app/services/api/auth/authController"

export const useLogin = (authPassword: string, authEmail: string) => {
  const [login, setLogin] = useState({
    access_token : '',
    refresh_token: '',
    expires_in: '',
    userId: '',
    avatar: '',
    fullName: ''
  });
  const [loginLoading, setLoginLoading] = useState<boolean>(true);
  const [loginError, setLoginError] = useState({});

  useEffect(() => {
    const postLogin = async (authPassword: string, authEmail: string) => {
      try {
        const loginHandle = await authController.PostLogin(authPassword, authEmail);
        setLogin(loginHandle);
      } catch (error: any) {
        setLoginError(error.message);
      } finally {
        setLoginLoading(false);
      }
    }
    postLogin(authPassword, authEmail);
  }, [])
  return { login, loginLoading, loginError }
}