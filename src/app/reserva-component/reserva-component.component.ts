import { Component } from '@angular/core';
import { DadosService } from '../dados.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva-component.component.html',
  styleUrls: ['./reserva-component.component.css']
})
export class ReservaComponent {
  hospedes: any[] = [];
  quartos: any[] = [];
  hospedeSelecionado: any;
  quartoSelecionado: any;
  quantidadeDias: number = 1;
  valorDiaria: number = 0;
  valorTotal: number = 0;
  reservas: any[] = [];
  editando: boolean = false;
  indiceEdicao: number | null = null;

  constructor(private dadosService: DadosService) {
    this.hospedes = this.dadosService.getHospedes();
    this.quartos = this.dadosService.getQuartos();
  }

  calcularValorTotal() {
    if (this.quartoSelecionado) {
      this.valorDiaria = this.quartoSelecionado.valorDiaria;
      this.valorTotal = this.valorDiaria * this.quantidadeDias;
    } else {
      this.valorTotal = 0;
    }
  }

  fazerReserva() {
    const reserva = {
      hospede: this.hospedeSelecionado,
      quarto: this.quartoSelecionado,
      quantidadeDias: this.quantidadeDias,
      valorTotal: this.valorTotal
    };

    if (this.editando && this.indiceEdicao !== null) {
      this.reservas[this.indiceEdicao] = reserva;
      alert('Reserva atualizada com sucesso!');
      this.editando = false;
      this.indiceEdicao = null;
    } else {
      this.reservas.push(reserva);
      alert(`Reserva feita com sucesso para ${this.hospedeSelecionado.nome} no quarto ${this.quartoSelecionado.numero}! Valor total: R$ ${this.valorTotal.toFixed(2)}`);
    }

    this.resetarFormulario();
  }

  editarReserva(indice: number) {
    const reserva = this.reservas[indice];
    this.hospedeSelecionado = reserva.hospede;
    this.quartoSelecionado = reserva.quarto;
    this.quantidadeDias = reserva.quantidadeDias;
    this.valorTotal = reserva.valorTotal;
    this.editando = true;
    this.indiceEdicao = indice;
  }

  excluirReserva(indice: number) {
    if (confirm('Tem certeza de que deseja excluir esta reserva?')) {
      this.reservas.splice(indice, 1);
      alert('Reserva excluída com sucesso!');
    }
  }

  resetarFormulario() {
    this.hospedeSelecionado = null;
    this.quartoSelecionado = null;
    this.quantidadeDias = 1;
    this.valorTotal = 0;
    this.editando = false;
    this.indiceEdicao = null;
  }
}
