export interface JWTType {
    iss?: string,
    sub?: string,
    aud?: string,
    exp?: number,
    nbf?: number,
    iat?: number,
    jti?: string
};

export interface CustomJWT extends JWTType {
    token_type: "access" | "refresh",
    user_id: number
};