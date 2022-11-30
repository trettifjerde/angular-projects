export class User {
    constructor(
        public email: string, 
        public id: string, 
        private _token: string,
        private _tokenExpirationDate: Date
        ) {}

    get token(): string { 
        if (! this._tokenExpirationDate || new Date() > this._tokenExpirationDate )
            return null;
        return this._token;
    }

    get tokenExpirationTime(): number { 
        if (! this.token)
            return null;
        return this._tokenExpirationDate.getTime() - new Date().getTime();
    }
}

export interface UserInterface {
    email: string,
    id: string,
    _token: string,
    _tokenExpirationDate: string
}