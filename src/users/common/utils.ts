import*as jwt from 'jsonwebtoken'
export class CommmonUtils{
    static generateJwtToken(jwtData){
    const generateJwtToken=jwt.sign(jwtData, "kflkkflkfjghufujfkksdjfjskcmskfjkslsa",{expiresIn:'1m'});
    return generateJwtToken;
  }
}