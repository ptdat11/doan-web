export interface registerPOST {
    user: {
        username: string,
        email: string,
        password: string
    },
    name: string,
    phone_number: string,
    address: string
};