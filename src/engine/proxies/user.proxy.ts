import { apiBaseHeaders, apiBaseUrl } from "../common/common.constants";

export interface UserDetailsModel {
  fullName: string;
  accessToken: string;
  accessSeconds: number;
}

export const authenticateUser = async (): Promise<UserDetailsModel> => {
  try {
    const apiurl = `${apiBaseUrl}/user`;
    const apiinit = {
      headers: apiBaseHeaders,
      credentials: "omit",
    } as RequestInit;
    const apiresponse = await fetch(apiurl, apiinit);
    if (apiresponse && apiresponse.ok) {
      const apiresult = (await apiresponse.json()) as UserDetailsModel;
      if (apiresult && apiresult.accessToken) return apiresult;
    }
    throw new Error("Empty or invalid api response");
  } catch (ex) {
    return await Promise.reject();
  }
};
