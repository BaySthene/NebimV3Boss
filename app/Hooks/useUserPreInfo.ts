import { useEffect, useState } from "react"
import { authController } from "app/services/api/auth/authController"

export const useUserPreInfo = (refreshToken: string | undefined, authToken: string,userId: string, expiresIn: string) => {
  const [userPreInfo, setUserPreInfo] = useState({avatar: '', fullName: '', access : { token: '', expiresIn: '', refreshToken: '' }});
  const [userPreInfoLoading, setUserPreInfoLoading] = useState<boolean>(true);
  const [userPreInfoError, setUserPreInfoError] = useState({});

  useEffect(() => {
    const getUserPreInfo = async (refreshToken: string | undefined, authToken: string, userId: string, expiresIn: string) => {
      try {
        const UserPreInfo = await  authController.GetUserPreInfo(refreshToken, authToken,userId,expiresIn)
        setUserPreInfo({
          avatar: UserPreInfo.avatar,
          fullName: UserPreInfo.fullName,
          access: UserPreInfo.access,
        });
      }
      catch (e: any) {
        setUserPreInfoError(e.message);
      }
      finally {
        setUserPreInfoLoading(false);
      }
    };
    getUserPreInfo(refreshToken, authToken, userId, expiresIn);
  }, [])
  return { userPreInfo, userPreInfoLoading, userPreInfoError };
};