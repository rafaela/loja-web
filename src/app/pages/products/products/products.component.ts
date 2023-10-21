import { UiService } from './../../../services/ui.service';
import { ApiService } from '../../../services/api.service';
import { Products } from './../../../models/Products';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';



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

  

  constructor(private cdr: ChangeDetectorRef, private productsService: ApiService, private ui: UiService){

    
  }

  ngOnInit() {
    this.ui.block();
    this.productsService.GetProducts().subscribe(data => {
      
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

      //item.DataCriacao = new Date(item.DAtaCriacao).toLocaleDataString('pt-br')
    })
    
    /*this.dataSource = new MatTableDataSource (ELEMENT_DATA);*/
    this.cdr.detectChanges();
  }

  /*ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }*/
}
