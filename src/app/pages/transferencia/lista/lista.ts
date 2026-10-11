import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { TransferenciaService } from '../transferencia.service';
import { Transferencia } from '../transferencia';
import { CurrencyPipe, DatePipe } from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  imports: [CurrencyPipe, DatePipe, RouterLink],
  selector: 'app-lista',
  styleUrl: './lista.css',
  templateUrl: './lista.html',
})
export class Lista implements OnInit {
  private readonly transferenciaService = inject(TransferenciaService);

  constructor(
    private cdr: ChangeDetectorRef,
  ) {}

  transferencias: Transferencia[] = [];
  carregando = true;
  mensagemErro = '';

  ngOnInit(): void {
    this.transferenciaService.listarTodos().subscribe({
      next: (dados) => {
        this.transferencias = dados;
        this.carregando = false;
        this.cdr.markForCheck();
      },
      error: (erro) => {
        console.error('Erro ao listar transferências:', erro);
        this.mensagemErro = 'Não foi possível conectar-se ao servidor. Tente novamente mais tarde.';
        this.cdr.markForCheck();
        this.carregando = false;
      },
    });
  }

  calcularTotal(): number {
    return this.transferencias.reduce((total, transferencia) => total + transferencia.valor, 0);
  }
}
