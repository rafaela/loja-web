import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { DialogDeleteComponent } from 'src/app/components/dialog-delete/dialog-delete.component';
import { ApiService } from 'src/app/services/api.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {
  clientsList: any = [];
  name = '';
  _columns: string[] = ['Ações', 'Nome', 'Telefone', 'CPF'];
  total = 0;
  data: any = {
    data: {
      name: null,
      incativc: false,
    },
    skip: 0,
    take: 20,
  };
  pageSize = 20;
  @ViewChild(MatPaginator) paginator = MatPaginator;

  ngAfterViewInit() {
    this.clientsList.paginator = this.paginator;
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

    this.api.getClients(this.data).subscribe(data => {
      this.clientsList = data.data;
      this.total = data.total;
      this.ui.unblock();
    })
  }

  
  rowSelected(row){
  }

  limpar(){
      this.data.data = {
        name: null,
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
