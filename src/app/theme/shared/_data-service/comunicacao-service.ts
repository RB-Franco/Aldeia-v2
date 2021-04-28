import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class ComunicaoService {
    
    constructor(private http: HttpClient) {}

    get() {
        return this.http.get('api/login/login');
    }
}