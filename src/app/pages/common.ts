

export enum TiposUnidade {
   Dinheiro = 1,
   Porcentagem = 2,
   Decimal = 3
};

//#region Utils
export class Utils {
   
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
