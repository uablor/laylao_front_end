
import { jwtDecode } from "jwt-decode";

export function decodeJwt(token : string) {
  try {
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
}
