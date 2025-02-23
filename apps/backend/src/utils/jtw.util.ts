import jwt, { JwtPayload } from "jsonwebtoken";

function assignToken(data: any) {
  return jwt.sign(data, process.env.HASH_TOKEN!);
}

function checkAssignToken(token: string) {
  try {
    return jwt.verify(token, process.env.HASH_TOKEN!) as JwtPayload;
  } catch (error) {
    throw new Error("Informe um token válido");
  }
}

export default { assignToken, checkAssignToken };
