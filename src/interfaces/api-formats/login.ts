export interface loginPOST {
    username: string,
    password: string
};

export interface JwtTokenPair { 
    refresh?: string,
    access?: string
};