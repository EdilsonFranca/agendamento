import { Component, inject, OnInit } from '@angular/core';
import { TransferenciaService } from '../transferencia.service';
import { Transferencia } from '../transferencia';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  imports: [CurrencyPipe, DatePipe],
  selector: 'app-lista',
  styleUrl: './lista.css',
  templateUrl: './lista.html',
})
export class Lista implements OnInit {
  private readonly transferenciaService = inject(TransferenciaService);

  transferencias: Transferencia[] = [];
  carregando = true;

  ngOnInit(): void {
    this.transferenciaService.listarTodos().subscribe({
      next: (dados) => {
        this.transferencias = dados;
        this.carregando = false;
      },
      error: (erro) => {
        console.error('Erro ao listar transferências:', erro);
        this.carregando = false;
      },
    });
  }

  calcularTotal(): number {
    return this.transferencias.reduce((total, transferencia) => total + transferencia.valor, 0);
  }
}
