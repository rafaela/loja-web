import { take } from 'rxjs/operators';
import { UiService } from './../../../services/ui.service';
import { ApiService } from '../../../services/api.service';
import { Products } from './../../../models/Products';
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorIntl, } from '@angular/material/paginator';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from 'src/app/components/dialog-delete/dialog-delete.component';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  
})
export class CategoriesComponent  implements OnInit{

  @Input() filter: any = {}
  @ViewChild(MatTable) myTable!: MatTable<any>;

  categoriesList: any = [];
  name = '';
  _columns: string[] = ['Ações', 'Nome', 'Inativo'];
  total = 0;
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
    this.categoriesList.paginator = this.paginator;
  }


  constructor(private cdr: ChangeDetectorRef, private api: ApiService, private ui: UiService, 
        private router: Router, public dialog: MatDialog, private loading: LoadingService){

  }

  ngOnInit() {
    
    this.buscaDados();
    
    /*this.dataSource = new MatTableDataSource (ELEMENT_DATA);*/
    this.cdr.detectChanges();
  }

  buscaDados(){

    this.api.getCategories(this.data).subscribe(data => {
      this.categoriesList = data.data;
      this.total = data.total;
      this.formataDados(this.categoriesList)
    })
    //}
    
  }

  formataDados(categoriesList){
    categoriesList.forEach(element => {
      element.value = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(element.value);

      if(element.featuredProduct){
        element.featuredProduct = 'Sim'
      }
      else{
        element.featuredProduct = 'Não'
      }

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
        this.api.deleteCategory(id).subscribe(data => {
          if(data.sucess){
            this.ui.sucess('', 'Categoria removida')
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
    this.api.getCategories(this.data).subscribe(data => {
      this.categoriesList = data.data;
      this.total = data.total;

      this.formataDados(this.categoriesList)
      this.ui.unblock();
    })
  }

  getPaginatorData(event){
    this.data.skip = event.pageIndex * event.pageSize;
    this.data.take = event.pageSize;
    this.pesquisar();
  }
}
