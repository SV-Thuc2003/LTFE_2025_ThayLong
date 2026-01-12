export interface LoginCredentials {
    username: string;
    password: string;
    // rememberMe: boolean;
}

// export interface LoginResponse {
//     success: boolean;
//     token?: string;
//     user?: {
//         id: string;
//         name: string;
//         email: string;
//         role: string;
//     };
//     error?: string;
// }
export interface LoginResponse {
    userId: number;
    token: string;
    username: string;
    role: string;
    error?: string;
}

export interface SocialLoginProvider {
    name: 'google' | 'facebook';
    icon: string;
    label: string;
}