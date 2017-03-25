import { Component } from '@angular/core';

import { Conhecimento } from './models/conhecimento';
import { Candidato } from './models/candidato';
import { Resposta } from './models/resposta';
import { ConhecimentoService } from './services/conhecimento.service';
import { CandidatoService } from './services/candidato.service';

// import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private conhecimentoService: ConhecimentoService, private candidatoService: CandidatoService) { }

  title = 'app works!';

  aguardando: boolean = false;
  atualizacao: boolean = false;
  confirmado: boolean = false;
  formulario: boolean = false;
  errorinnome: boolean = false;
  errorinemail: boolean = false;

  candidato: Candidato = new Candidato();

  conhecimentos: Conhecimento[] = [];
  respostas: Resposta[] = [];

  novo(): void {
    this.conhecimentoService.get()
      .then(data => {
        this.conhecimentos = data;

        this.respostas = [];

        data.forEach(element => {

          let resposta = new Resposta();
          resposta.Conhecimento = element.Nome;
          resposta.ConhecimentoId = element.Id;
          resposta.Pontos = 0;

          this.respostas.push(resposta);

        });

        this.aguardando = false;

      });
  }

  pesquisa(): void {



    if (this.isValid(this.candidato.Email, this.candidato.Nome)) {
      this.aguardando = true;
      this.candidatoService.get(this.candidato.Nome, this.candidato.Email)
        .then(data => {

          this.candidato = data;

          this.respostas = data.RespostaSet;

          this.atualizacao = true;

          this.aguardando = false;


        }).catch((error) => {

          this.novo();



        });
    }

  }

  envia(): void {

    this.aguardando = true;

    this.candidato.RespostaSet = this.respostas;

    this.candidatoService.post(this.candidato)
      .then(data => {
        this.confirmado = true;
        this.aguardando = false;
      });
  }

  inicia(): void {
    this.candidato = new Candidato();
    this.respostas = [];

    if (this.confirmado)
      this.formulario = false;
    else
      this.formulario = true;

    this.confirmado = false;
    this.atualizacao = false;

  }

  isValid(email, nome): boolean {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.errorinemail = !re.test(email);
    this.errorinnome = !(nome.length > 2);

    return re.test(email) && (nome.length > 2);
  }

}
