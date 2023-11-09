import { UiService } from './../../../services/ui.service';
import { ApiService } from '../../../services/api.service';
import { Products } from './../../../models/Products';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { DialogDeleteComponent } from 'src/app/components/dialog-delete/dialog-delete.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  
})
export class ProductsComponent  implements OnInit{


  productsList: any = [];
  name;
  _columns: string[] = ['Ações', 'Nome', 'Valor', 'Categoria', 'ProdutoDestaque', 'Inativo'];

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);

  

  constructor(private cdr: ChangeDetectorRef, private api: ApiService, private ui: UiService,  public dialog: MatDialog){

    
  }

  ngOnInit() {
    
    this.buscaDados();
    
    /*this.dataSource = new MatTableDataSource (ELEMENT_DATA);*/
    this.cdr.detectChanges();
  }

  buscaDados(){
    this.ui.block();
    this.api.getProducts().subscribe(data => {
      
      this.productsList = data.data;

      this.productsList.forEach(element => {
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
      this.ui.unblock();
      console.log(this.productsList)
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
}
