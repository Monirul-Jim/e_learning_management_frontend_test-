import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userId: string;
  exp: number;
}

const decodeToken = (token: string): DecodedToken => {
  return jwtDecode<DecodedToken>(token);
};
export default decodeToken;
