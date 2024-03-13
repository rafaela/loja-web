import { Component, ChangeDetectorRef, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogDeleteComponent } from 'src/app/components/dialog-delete/dialog-delete.component';
import { ApiService } from 'src/app/services/api.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
  @Input() filter: any = {}
  @ViewChild(MatTable) myTable!: MatTable<any>;

  employeesList: any = [];
  name = '';
  _columns: string[] = ['Ações', 'Nome', 'Telefone', 'CPF', 'Email', 'Aniversário', 'Inativo'];
  total = 0 ;
  data: any = {
    data: {
      name: '',
      incativc: false
    },
    skip: 0,
    take: 20,
  };

  pageSize = 20;
  @ViewChild(MatPaginator) paginator = MatPaginator;

  ngAfterViewInit() {
    this.employeesList.paginator = this.paginator;
  }

  constructor(private cdr: ChangeDetectorRef, private api: ApiService, private ui: UiService, 
        private router: Router, public dialog: MatDialog){

  }

  ngOnInit() {
    
    this.buscaDados();
    
    /*this.dataSource = new MatTableDataSource (ELEMENT_DATA);*/
    this.cdr.detectChanges();
  }

  buscaDados(){
    this.ui.block();
    this.data.skip = 0;
    this.data.take = this.pageSize;

    this.api.getEmployees(this.data).subscribe(data => {
      this.employeesList = data.data;
      this.formataDados(this.employeesList)
      this.ui.unblock();
    })
    
  }

  formataDados(employeesList){
    employeesList.forEach(element => {
     
      if(element.inactive){
        element.inactive = 'Sim'
      }
      else{
        element.inactive = 'Não'
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
        this.api.deleteEmployee(id).subscribe(data => {
          if(data.sucess){
            this.ui.sucess('', 'Funcionário removido')
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
    this.api.getEmployees(this.data).subscribe(data => {
      this.employeesList = data.data;
      this.total = data.total;

      this.formataDados(this.employeesList)
      this.ui.unblock();
    })
  }

  getPaginatorData(event){
    this.data.skip = event.pageIndex * event.pageSize;
    this.data.take = event.pageSize;
    this.pesquisar();
  }

}
