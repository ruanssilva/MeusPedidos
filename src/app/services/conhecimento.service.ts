import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Conhecimento } from '../models/conhecimento';

import { BaseService } from './base.service'

@Injectable()
export class ConhecimentoService {

    constructor(private http: Http) { }

    get(): Promise<Conhecimento[]> {
        return this.http.get(`${BaseService.api}/conhecimento`)
            .toPromise()
            .then(response => response.json() as Conhecimento[])
            .catch((error)=> {

                console.error('Ocorreu um erro', error);
                return Promise.reject(error.message || error);

            });
    }

}