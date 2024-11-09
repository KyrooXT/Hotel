import { Component } from '@angular/core';
import { DadosService } from '../dados.service';

@Component({
  selector: 'app-cadastro-hospedes',
  templateUrl: './cadastro-hospedes-component.component.html',
  styleUrls: ['./cadastro-hospedes-component.component.css']
})
export class CadastroHospedesComponent {
  nome: string = '';
  documento: string = '';
  telefone: string = '';
  cidade: string = '';
  hospedes: any[] = [];

  constructor(private dadosService: DadosService) {
    this.hospedes = this.dadosService.getHospedes();
  }

  cadastrarHospede() {
    const hospede = { nome: this.nome, documento: this.documento, telefone: this.telefone, cidade: this.cidade };
    this.dadosService.adicionarHospede(hospede);
    this.resetForm();
    alert('Hóspede cadastrado com sucesso!');
  }

  resetForm() {
    this.nome = '';
    this.documento = '';
    this.telefone = '';
    this.cidade = '';
    this.hospedes = this.dadosService.getHospedes(); // Atualiza a lista
  }

  editarHospede(index: number) {
    const hospede = this.hospedes[index];
    this.nome = hospede.nome;
    this.documento = hospede.documento;
    this.telefone = hospede.telefone;
    this.cidade = hospede.cidade;
    this.hospedes.splice(index, 1); // Remove o hóspede da lista temporariamente
  }

  excluirHospede(index: number) {
    this.dadosService.getHospedes().splice(index, 1); // Exclui permanentemente
    this.hospedes = this.dadosService.getHospedes(); // Atualiza a lista
  }
}
