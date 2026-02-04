export interface User { //Todos os objetos tem que ter esses campos!
    id: string;
    username: string;
    is_active: boolean;
    api_key?: string; // O "?" torna o campo opcional, pois não retorna a key por segurança, mas o login sim
}

export interface LoginResponse {
    api_key: string;
    username: string;
    message: string;
}