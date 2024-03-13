import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { DialogDeleteComponent } from 'src/app/components/dialog-delete/dialog-delete.component';
import { ApiService } from 'src/app/services/api.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent {
  saleList: any = [];
  name = '';
  _columns: string[] = ['Ações', 'Nome', 'Valor', 'Data Venda', 'Forma pagamento', 'Status Pagamento', 'Status Entrega', 'Data Entrega'];
  total = 0;
  data: any = {
    data: {
      name: null,
      incativc: false,
      epaymentStatus: 0,
      edeliveryStatus: 0
    },
    skip: 0,
    take: 20,
  };
  pageSize = 20;
  @ViewChild(MatPaginator) paginator = MatPaginator;

  ngAfterViewInit() {
    this.saleList.paginator = this.paginator;
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


    this.data.data.epaymentStatus = parseInt(this.data.data.epaymentStatus)
    this.data.data.edeliveryStatus = parseInt(this.data.data.edeliveryStatus)
    this.api.getSales(this.data).subscribe(data => {
      this.saleList = data.data;
      this.total = data.total;
      this.saleList.forEach(element => {
        element.valorTotal = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(element.valorTotal);
      })
      //this.formataDados(this.saleList)
      this.ui.unblock();
    })
  }

  
  rowSelected(row){
  }

  limpar(){
      this.data.data = {
        name: null,
        incativc: false,
        epaymentStatus: 0,
        edeliveryStatus: 0
      };
  }

  pesquisar(){
    this.buscaDados();
  }

  getPaginatorData(event){
    this.data.skip = event.pageIndex * event.pageSize;
    this.data.take = event.pageSize;
    this.pesquisar();
  }
}
