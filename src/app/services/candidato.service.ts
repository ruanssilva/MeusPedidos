import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Candidato } from '../models/candidato';

import { BaseService } from './base.service'

@Injectable()
export class CandidatoService {

    constructor(private http: Http) { }

    get(nome: string, email: string): Promise<Candidato> {
        return this.http.get(`${BaseService.api}/candidato/?email=${email}&nome=${nome}`)
            .toPromise()
            .then(response => response.json() as Candidato)
            .catch((error) => {

                console.error('Ocorreu um erro', error);
                return Promise.reject(error.message || error);

            });
    }

    post(candidato: Candidato): Promise<Candidato> {
        return this.http
            .post(`${BaseService.api}/candidato/`, JSON.stringify(candidato), { headers: new Headers({ 'Content-Type': 'application/json' }) })
            .toPromise()
            .then(res => res.json() as Candidato)
            .catch((error) => {

                console.error('Ocorreu um erro', error);
                return Promise.reject(error.message || error);

            });
    }

}