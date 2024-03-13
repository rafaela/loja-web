import { UiService } from './../../../services/ui.service';
import { ApiService } from '../../../services/api.service';
import { Products } from './../../../models/Products';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { DialogDeleteComponent } from 'src/app/components/dialog-delete/dialog-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  
})
export class ProductsComponent  implements OnInit{


  productsList: any = [];
  name = '';
  _columns: string[] = ['Ações', 'Nome', 'Valor', 'Categoria', 'ProdutoDestaque', 'Inativo'];

  data: any = {
    data: {
      name: '',
      inactive: false,
      FeaturedProduct: false,

    },
    skip: 0,
    take: 20,
  };

  total = 0;
  pageSize = 20;
  @ViewChild(MatPaginator) paginator = MatPaginator;

  ngAfterViewInit() {
    this.productsList.paginator = this.paginator;
  }

  constructor(private cdr: ChangeDetectorRef, private api: ApiService, private ui: UiService,
     public dialog: MatDialog, private router: Router,){

    
  }

  ngOnInit() {
    this.buscaDados();
    /*this.dataSource = new MatTableDataSource (ELEMENT_DATA);*/
    this.cdr.detectChanges();
  }

  async buscaDados(){
    this.ui.block();
    this.data.skip = 0;
    this.data.take = this.pageSize;
    this.api.getProducts(this.data).subscribe(data => {
      
      this.productsList = data.data;
      this.total = data.total;

       this.productsList.forEach(element => {
        element.value = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(element.value);
        if(element.featuredProduct)
          element.featuredProduct = 'Sim'
        else
          element.featuredProduct = 'Não'
        if(element.inactive)
          element.inactive = 'Sim'
        else
          element.inactive = 'Não'
      })
      this.ui.unblock();
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
        this.api.deleteProduct(id).subscribe(data => {
          if(data.sucess){
            this.buscaDados();
            this.ui.sucess('', 'Produto removido')
          }
          else
            this.ui.error('', data.message)
        })
      }
    });

  }

  inserir(){
    this.router.navigate([this.router.url + '/0']);
  }

  rowSelected(row){
    console.log(row)
  }

  limpar(){
    this.data.data = {};
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
