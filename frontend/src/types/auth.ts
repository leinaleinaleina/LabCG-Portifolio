//Entrada: Strings, booleano
//Saída: Nenhuma
export interface User { //Todos os objetos tem que ter esses campos!
    id: string;
    username: string;
    is_active: boolean;
    api_key?: string; // O "?" torna o campo opcional, pois não retorna a key por segurança, mas o login sim
}

//Entrada: Strings
//Saída: Nenhuma
export interface LoginResponse {
    api_key: string;
    username: string;
    message: string;
}