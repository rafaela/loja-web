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
  name;
  _columns: string[] = ['Ações', 'Nome', 'Telefone', 'CPF', 'Email', 'Aniversário', 'Inativo'];

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);

  

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
    /*if(this.filter){
      this.api.getCategoriesNameInactive(this.filter).subscribe(data => {
        this.categoriesList = data.data;
        this.formataDados(this.categoriesList)
        this.ui.unblock();
      })
    }
    else{*/
    this.api.getEmployees().subscribe(data => {
      this.employeesList = data.data;
      this.formataDados(this.employeesList)
      this.ui.unblock();
    })
    //}
    
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

  ngAfterViewInit() {
    this.employeesList.paginator = this.paginator;
  }

}
