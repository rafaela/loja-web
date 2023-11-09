/* eslint-disable @typescript-eslint/naming-convention */
import { formatDate } from '@angular/common';
import * as moment from 'moment';

//#region Types
type ITipoListaCor = {
   ID: number;
   Descricao: string;
   Cor?: string;
   CorTexto?: string;
};
//#endregion

//#region Estruturas Relacionadas a Vendas
export const TiposPagamento: ITipoListaCor[] = [
   { ID: 1, Descricao: 'Credito' },
   { ID: 2, Descricao: 'Credito Parcelado' },
   { ID: 3, Descricao: 'Debito' },
   { ID: 4, Descricao: 'Boleto' },
   { ID: 5, Descricao: 'Em Loja' },
   { ID: 6, Descricao: 'Outros' },
   { ID: 7, Descricao: 'Pix' },
   { ID: 8, Descricao: 'Não Definido' }
];

export enum StatusVenda {
   NaoDefinido = 0,
   Pendente = 1,
   Adimplente = 2,
   Inadimplente = 3,
   Finalizada = 4,
   PedidoCancelado = 5,
   PagamentoCancelado = 6,
   NA = 7,
   ParcialmentePago = 8,
   CancelamentoPendente = 9,
   VendaCancelada = 10,
   CobrancaSuspensa = 11,
   CancelamentoSolicitado = 12,
   CancelamentoInadimplencia = 13
};

export enum StatusTransacaoPagamento {
   Unspecified = 0,
   Pendente = 1,
   Pago = 2,
   EmAndamento = 3,
   SoliciatacaoCancelada = 4,
   PagamentoCancelado = 5,
   CancelamentoPendente = 6,
   Substituido = 7,
   Excluido = 8,
   CancelamentoSolicitado = 9
};

export enum StatusParcela {
   Excluida = 0,
   Agendada = 1,
   Efetivada = 2,
   Negada = 3,
   Renegociada = 4,
   Substituida = 5,
   PagamentoCancelado = 6,
   AgendamentoCancelado = 8,
   CanceladaTeste = 9,
   PagamentoEmLoja = 11,
   AguardandoCancelamentoPagamento = 12,
   PagamentoEmBoleto = 13,
   CancelamentoSolicitado = 14,
   CanceladoInadimplencia = 15,
   PagamentoComPix = 16,
};

export enum StatusCredito {
   Unspecified = 0,
   Pago = 1,
   Cancelado = 2,
   Atrasado = 3,
   Processado = 4,
   Agendado = 5,
   CanceladoInadimplencia = 6,
   Substituido = 7,
   Excluido = 8
};

export const StatusCreditoList: ITipoListaCor[] = [
   { ID: StatusCredito.Unspecified, Descricao: '' },
   { ID: StatusCredito.Pago, Descricao: 'Pago' },
   { ID: StatusCredito.Cancelado, Descricao: 'Cancelado' },
   { ID: StatusCredito.Atrasado, Descricao: 'Atrasado' },
   { ID: StatusCredito.Processado, Descricao: 'Processado' },
   { ID: StatusCredito.Agendado, Descricao: 'Agendado' },
   { ID: StatusCredito.CanceladoInadimplencia, Descricao: 'Cancelado por Inadimplência' },
   { ID: StatusCredito.Substituido, Descricao: 'Substituído' },
   { ID: StatusCredito.Excluido, Descricao: 'Excluído' },
];

export const StatusVendaList: ITipoListaCor[] = [
   { ID: StatusVenda.NaoDefinido, Descricao: '', Cor: '', CorTexto: '' },
   { ID: StatusVenda.Pendente, Descricao: 'Pendente', Cor: '#ffff99', CorTexto: '#ffc409' },
   { ID: StatusVenda.Adimplente, Descricao: 'Adimplente', Cor: '#ccff99', CorTexto: '#00B050' },
   { ID: StatusVenda.Inadimplente, Descricao: 'Inadimplente', Cor: '#ff9999', CorTexto: '#eb445a' },
   { ID: StatusVenda.Finalizada, Descricao: 'Finalizada', Cor: '', CorTexto: '#2F5597' },
   { ID: StatusVenda.PedidoCancelado, Descricao: 'Pedido Cancelado', Cor: '#d9d9d9', CorTexto: '#eb445a' },
   { ID: StatusVenda.PagamentoCancelado, Descricao: 'Pagamento Cancelado', Cor: '#d9d9d9', CorTexto: '#eb445a' },
   { ID: StatusVenda.NA, Descricao: '', Cor: '', CorTexto: '' },
   { ID: StatusVenda.ParcialmentePago, Descricao: 'Parcialmente Pago', Cor: '#78d0ea', CorTexto: '#ffc409' },
   { ID: StatusVenda.CancelamentoPendente, Descricao: 'Cancelamento Pendente', Cor: '#B404AE', CorTexto: '#eb445a' },
   { ID: StatusVenda.VendaCancelada, Descricao: 'Venda Cancelada', Cor: '#dc7b7b', CorTexto: '#eb445a' },
   { ID: StatusVenda.CobrancaSuspensa, Descricao: 'Cobrança Suspensa', Cor: '#f7e6ff', CorTexto: '#ffc409' },
   { ID: StatusVenda.CancelamentoSolicitado, Descricao: 'Cancelamento Solicitado', Cor: '#DC7CCC', CorTexto: '#eb445a' },
   { ID: StatusVenda.CancelamentoInadimplencia, Descricao: 'Cancelamento Inadimplência', Cor: '#FF00FF', CorTexto: '#eb445a' }
];

export const StatusPagamentoList: ITipoListaCor[] = [
   { ID: 0, Descricao: '', Cor: '' },
   { ID: 1, Descricao: 'Pendente', Cor: '#d4d40a' },
   { ID: 2, Descricao: 'Pago', Cor: '#23a523' },
   { ID: 3, Descricao: 'Em Andamento', Cor: '#68a6e8' },
   { ID: 4, Descricao: 'Solicitação Cancelada', Cor: '#dc7b7b' },
   { ID: 5, Descricao: 'Pagamento Cancelado', Cor: '#dc7b7b' },
   { ID: 6, Descricao: 'Cancelamento Pendente', Cor: '#d4d40a' },
   { ID: 7, Descricao: 'Substituído', Cor: 'darkgray' },
   { ID: 8, Descricao: 'Excluído', Cor: 'red' },
   { ID: 9, Descricao: 'Cancelamento Solicitado', Cor: '#DC7CCC' }
];

export const StatusTransacaoPagamentoList: ITipoListaCor[] = [
   { ID: StatusTransacaoPagamento.Unspecified, Descricao: ''},
   { ID: StatusTransacaoPagamento.Pendente, Descricao: 'Pendente'},
   { ID: StatusTransacaoPagamento.Pago, Descricao: 'Pago'},
   { ID: StatusTransacaoPagamento.EmAndamento, Descricao: 'Em Andamento'},
   { ID: StatusTransacaoPagamento.SoliciatacaoCancelada, Descricao: 'Solicitação Cancelada'},
   { ID: StatusTransacaoPagamento.PagamentoCancelado, Descricao: 'Pagamento Cancelado'},
   { ID: StatusTransacaoPagamento.CancelamentoPendente, Descricao: 'Cancelamento Pendente'},
   { ID: StatusTransacaoPagamento.Substituido, Descricao: 'Substituído'},
   { ID: StatusTransacaoPagamento.Excluido, Descricao: 'Excluído'},
   { ID: StatusTransacaoPagamento.CancelamentoSolicitado, Descricao: 'Cancelamento Solicitado'},
];

export const StatusParcelaList: ITipoListaCor[] = [
   { ID: StatusParcela.Excluida, Descricao: 'Excluída', Cor: '' },
   { ID: StatusParcela.Agendada, Descricao: 'Agendada', Cor: '#eaea90' },
   { ID: StatusParcela.Efetivada, Descricao: 'Efetivada', Cor: '#65d87f' },
   { ID: StatusParcela.Negada, Descricao: 'Negada', Cor: '#f443368a' },
   { ID: StatusParcela.Renegociada, Descricao: 'Renegociada', Cor: '#d9d9d9' },
   { ID: StatusParcela.Substituida, Descricao: 'Substituida', Cor: '#d9d9d9' },
   { ID: StatusParcela.PagamentoCancelado, Descricao: 'Pagamento Cancelado', Cor: '#dc7b7b' },
   { ID: 7, Descricao: '', Cor: '' },
   { ID: StatusParcela.AgendamentoCancelado, Descricao: 'Agendamento Cancelado', Cor: '#dc7b7b' },
   { ID: StatusParcela.CanceladaTeste, Descricao: 'Cancelado Teste', Cor: '#dc7b7b' },
   { ID: 10, Descricao: '', Cor: '' },
   { ID: StatusParcela.PagamentoEmLoja, Descricao: 'Pago em Loja', Cor: '#65d87f' },
   { ID: StatusParcela.AguardandoCancelamentoPagamento, Descricao: 'Aguardando Cancelamento Pagamento', Cor: '#eaea90' },
   { ID: StatusParcela.PagamentoEmBoleto, Descricao: 'Pago em Boleto', Cor: '#99ff33' },
   { ID: StatusParcela.CancelamentoSolicitado, Descricao: 'Cancelamento Solicitado', Cor: '#DC7CCC' },
   { ID: StatusParcela.CanceladoInadimplencia, Descricao: 'Cancelamento Inadimplência', Cor: '#FF00FF' },
   { ID: StatusParcela.PagamentoComPix, Descricao: 'Pago em Pix', Cor: '#98fe34' },
];

export const TiposAcaoVenda: ITipoListaCor[] = [
   { ID: 1, Descricao: 'Venda' },
   { ID: 8, Descricao: 'Renegociação' },
   { ID: 7, Descricao: 'Cancelamento Parcial' },
   { ID: 14, Descricao: 'Renovação' }
];
//#endregion Estruturas Relacionadas a Vendas

//#region Enums
export enum StatusConfiguracaoProcessadora {
   NaoDefinido = 0,
   ConfiguracaoPendente = 1,
   Ativa = 2,
   Inativa = 3
};

export enum TiposUnidade {
   Dinheiro = 1,
   Porcentagem = 2,
   Decimal = 3
};
//#endregion Enums

//#region Lists
export const listaEstados = [
   { UF: 'AC', Estado: 'Acre' },
   { UF: 'AL', Estado: 'Alagoas' },
   { UF: 'AP', Estado: 'Amapá' },
   { UF: 'AM', Estado: 'Amazonas' },
   { UF: 'BA', Estado: 'Bahia' },
   { UF: 'CE', Estado: 'Ceará' },
   { UF: 'DF', Estado: 'Distrito Federal ' },
   { UF: 'ES', Estado: 'Espírito Santo' },
   { UF: 'GO', Estado: 'Goiás' },
   { UF: 'MA', Estado: 'Maranhão' },
   { UF: 'MT', Estado: 'Mato Grosso' },
   { UF: 'MS', Estado: 'Mato Grosso do Sul' },
   { UF: 'MG', Estado: 'Minas Gerais' },
   { UF: 'PA', Estado: 'Pará' },
   { UF: 'PB', Estado: 'Paraíba' },
   { UF: 'PR', Estado: 'Paraná' },
   { UF: 'PE', Estado: 'Pernambuco' },
   { UF: 'PI', Estado: 'Piauí' },
   { UF: 'RJ', Estado: 'Rio de Janeiro' },
   { UF: 'RN', Estado: 'Rio Grande do Norte' },
   { UF: 'RS', Estado: 'Rio Grande do Sul' },
   { UF: 'RO', Estado: 'Rondônia' },
   { UF: 'RR', Estado: 'Roraima' },
   { UF: 'SC', Estado: 'Santa Catarina' },
   { UF: 'SP', Estado: 'São Paulo' },
   { UF: 'SE', Estado: 'Sergipe' },
   { UF: 'TO', Estado: 'Tocantins' },
];



//#region Utils
export class Utils {
   static dateDOTNET2JS(d) {
      const t = (d || '').match(/\/Date\((\d+)(\+|\-)(\d{2})(\d{2})\)\//) || [];
      if (t.length === 5) {
         return formatDate(moment(d).toDate(), 'dd/MM/yyyy', 'en');
      }
      const u = (d || '').match(/\/Date\((\d+)\)\//) || [];
      if (u.length === 3) {
         return formatDate(moment(d).toDate(), 'MM/yyyy', 'en');
      }
      return null;
   }

   static dateJS2DOTNET(d: Date) {
      if (d) {
         const t: any = d.getTime() + (d.getTimezoneOffset() * 60000);
         return '/Date(' + (t * 1) + '+0000)/';
      }
      return null;
   }

   // Parse da data no formato dd/MM/yyyy para yyyy-MM-dd utilizado no input do tipo data
   static parseDataToInputForm(data: string | Date) {
      if (data) {
         if (data instanceof Date) {
            return `${this.numberPad(data.getUTCFullYear(), 4)}` +
               `-${this.numberPad(data.getUTCMonth() + 1)}` +
               `-${this.numberPad(data.getUTCDate())}`;
         }
         else if (data.length === 10) {
            // dd/MM/yyyy para yyyy-MM-dd
            return `${data.slice(6)}-${data.slice(3, 5)}-${data.slice(0, 2)}`;
         }
      }
      return '';
   }

   static numberPad(value: number | string, size: number = 2) {
      return String(value).padStart(size, '0');
   }
}
//#endregion
