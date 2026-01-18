export interface AuthContextType {
    username: string | null;
    token: string | null;
    isLoggedIn: boolean;
    // isLoading: boolean;
    login: (username: string, token: string) => void;
    logout: () => void;
}