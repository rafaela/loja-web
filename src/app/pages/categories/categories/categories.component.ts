import { UiService } from './../../../services/ui.service';
import { ApiService } from '../../../services/api.service';
import { Products } from './../../../models/Products';
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from 'src/app/components/dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  
})
export class CategoriesComponent  implements OnInit{

  @Input() filter: any = {}
  @ViewChild(MatTable) myTable!: MatTable<any>;

  categoriesList: any = [];
  name;
  _columns: string[] = ['Ações', 'Nome', 'Inativo'];

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
    this.api.getCategories().subscribe(data => {
      this.categoriesList = data.data;
      this.formataDados(this.categoriesList)
      this.ui.unblock();
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



  ngAfterViewInit() {
    this.categoriesList.paginator = this.paginator;
  }
}
