import { ChangeDetectorRef, Component, inject } from '@angular/core';
import {TransferenciaService} from '../transferencia.service';
import { RouterLink} from '@angular/router';
import {Transferencia} from '../transferencia.model';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  selector: 'app-cadastro',
  styleUrl: './cadastro.css',
  templateUrl: './cadastro.html',
})
export class Cadastro {
  private readonly fb = inject(FormBuilder);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly transferenciaService = inject(TransferenciaService);

  contaOrigem = '';
  contaDestino = '';
  valor: number | null = null;
  dataTransferencia = '';

  carregando = false;
  mensagemErro = '';
  mensagemSucesso = '';

  get dataMinima(): string {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');

    return `${ano}-${mes}-${dia}`;
  }

  agendar(): void {
    this.mensagemErro = '';
    this.mensagemSucesso = '';

    if (!this.contaOrigem) {
      this.mensagemErro = 'Informe a conta de origem.';
      return;
    }

    if (!/^\d{10}$/.test(this.contaOrigem)) {
      this.mensagemErro = 'A conta de origem deve conter exatamente 10 dígitos numéricos.';
      return;
    }

    if (!this.contaDestino) {
      this.mensagemErro = 'Informe a conta de destino.';
      return;
    }

    if (!/^\d{10}$/.test(this.contaDestino)) {
      this.mensagemErro = 'A conta de destino deve conter exatamente 10 dígitos numéricos.';
      return;
    }

    if (this.contaOrigem === this.contaDestino) {
      this.mensagemErro = 'A conta de origem deve ser diferente da conta de destino.';
      return;
    }

    if (this.valor === null || this.valor === undefined) {
      this.mensagemErro = 'Informe o valor da transferência.';
      return;
    }

    if (this.valor <= 0) {
      this.mensagemErro = 'O valor da transferência deve ser maior que R$ 0,00.';
      return;
    }


    if (!this.dataTransferencia) {
      this.mensagemErro = 'Informe a data da transferência.';
      return;
    }

    const data = new Date(`${this.dataTransferencia}T00:00:00`);

    if (
      Number.isNaN(data.getTime()) ||
      data.toISOString().slice(0, 10) !== this.dataTransferencia
    ) {
      this.mensagemErro = 'Informe uma data válida.';
      return;
    }

    if (this.dataTransferencia < this.dataMinima) {
      this.mensagemErro = 'A data da transferência deve ser igual ou posterior a hoje.';
      return;
    }

    const dados: Transferencia = {
      contaOrigem: this.contaOrigem,
      contaDestino: this.contaDestino,
      valor: this.valor,
      dataTransferencia: this.dataTransferencia,
    };

    this.carregando = true;
    this.transferenciaService.agendar(dados).subscribe({
      next: () => {
        this.carregando = false;
        this.mensagemSucesso = 'Transferência agendada com sucesso!';

        this.contaOrigem = '';
        this.contaDestino = '';
        this.valor = null;
        this.dataTransferencia = '';
        this.cdr.detectChanges();
      },
      error: (erro) => {
        this.mensagemErro =
          erro.error?.message ?? 'Não foi possível agendar a transferência. Tente novamente.';
        console.error('Erro ao agendar transferência:', erro);
      },
    });
  }

  get valorFormatado(): string {
    if (this.valor === null || this.valor === undefined) {
      return '';
    }

    return this.valor.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  formatarValor(valorDigitado: string): void {
    const numeros = valorDigitado.replace(/\D/g, '');

    if (!numeros) {
      this.valor = null;
      return;
    }

    this.valor = Number(numeros) / 100;
  }

  somenteNumeros(event: KeyboardEvent): void {
    if (!/^\d$/.test(event.key)) {
      event.preventDefault();
    }
  }
}
