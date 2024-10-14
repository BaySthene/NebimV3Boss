import { useEffect, useState } from "react"
import { authController } from "app/services/api/auth/authController"

export const useUserPreInfo = (authToken: string,userId: string) => {
  const [userPreInfo, setUserPreInfo] = useState({avatar: '', fullName: ''});
  const [userPreInfoLoading, setUserPreInfoLoading] = useState<boolean>(true);
  const [userPreInfoError, setUserPreInfoError] = useState({});

  useEffect(() => {
    const getUserPreInfo = async (authToken: string,userId: string) => {
      try {
        const UserPreInfo = await  authController.GetUserPreInfo(authToken,userId);
        console.log(UserPreInfo);
        setUserPreInfo({
          avatar: UserPreInfo.avatar,
          fullName: UserPreInfo.fullName,
        });
      }
      catch (e: any) {
        setUserPreInfoError(e.message);
      }
      finally {
        setUserPreInfoLoading(false);
      }
    };
    getUserPreInfo(authToken, userId);
  }, [])
  return { userPreInfo, userPreInfoLoading, userPreInfoError };
};