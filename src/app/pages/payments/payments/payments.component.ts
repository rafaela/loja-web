import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { DialogDeleteComponent } from 'src/app/components/dialog-delete/dialog-delete.component';
import { ApiService } from 'src/app/services/api.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent {
  paymentsList: any = [];
  name;
  _columns: string[] = ['Ações', 'Nome', 'Tipo', 'Parcelas', 'Juros', 'Desconto', 'Inativo'];
  total;
  data: any = {
    data: {
      name: null,
      incativc: false
    },
    skip: 0,
    take: 20,
  };
  pageSize = 20;
  @ViewChild(MatPaginator) paginator = MatPaginator;

  ngAfterViewInit() {
    this.paymentsList.paginator = this.paginator;
  }


  constructor(private cdr: ChangeDetectorRef, private api: ApiService, private ui: UiService, 
        private router: Router, public dialog: MatDialog){

  }

  ngOnInit() {
    
    this.buscaDados();
    this.cdr.detectChanges();
  }

  buscaDados(){
    this.ui.block();

    this.data.skip = 0;
    this.data.take = this.pageSize;

    this.api.getPayments(this.data).subscribe(data => {
      this.paymentsList = data.data;
      this.total = data.total;
      this.formataDados(this.paymentsList)
      this.ui.unblock();
    })
  }

  formataDados(paymentsList){
    paymentsList.forEach(element => {
      if(element.inactive){
        element.inactive = 'Sim'
      }
      else{
        element.inactive = 'Não'
      }
      if(element.fees){
        element.fees = element.fees + '%';
      }

      if(element.discount){
        element.discount = element.discount + '%'
      }
      if(element.methods == 1){
        element.methods = 'Crédito à vista'
      }
      else if(element.methods == 2){
        element.methods = 'Débito'
      }
      else if(element.methods == 3){
        element.methods = 'Boleto'
      }
      else if(element.methods == 4){
        element.methods = 'Pix'
      }
      else if(element.methods == 5){
        element.methods = 'Crédito parcelado'
      }

    })
  }
  
  delete(id, enterAnimationDuration, exitAnimationDuration){

    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(data =>{
      if(data){
        this.api.deletePayment(id).subscribe(data => {
          if(data.sucess){
            this.ui.sucess('', 'Forma de pagamento removido')
            this.buscaDados();
          }
          else
            this.ui.error('', data.message)
        })
      }
    });

  }
  
  rowSelected(row){
  }

  inserir(){
    this.router.navigate([this.router.url + '/0']);
  }

  limpar(){
      this.data.data = {};
  }

  pesquisar(){
    this.ui.block();
    this.api.getPayments(this.data).subscribe(data => {
      this.paymentsList = data.data;
      this.total = data.total;

      this.formataDados(this.paymentsList)
      this.ui.unblock();
    })
  }

  getPaginatorData(event){
    this.data.skip = event.pageIndex * event.pageSize;
    this.data.take = event.pageSize;
    this.pesquisar();
  }

}
