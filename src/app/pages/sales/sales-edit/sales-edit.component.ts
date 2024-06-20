import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UiService } from 'src/app/services/ui.service';
import { MyErrorStateMatcher } from '../../MyErrorStateMatcher';

@Component({
  selector: 'app-sales-edit',
  templateUrl: './sales-edit.component.html',
  styleUrls: ['./sales-edit.component.scss']
})
export class SalesEditComponent implements OnInit{
  public model = {
    name: '',
    valorTotal: 0,
    paymentMethod: '',
    paymentStatus: '',
    deliveryStatus: '',
    address: {
      cep: '',
      city: '',
      complement: '',
      neighborhood: '',
      number: '',
      reference: '',
      state: '',
      street: '',
    },
    client: {
      name: '',
      phone: '',
      cpf: '',
      email: '',
      birthDate: ''
    },
    products: [{
      name: '',
      value: 0,
      amount: 0,
      photos: [{
        urlImage: ''
      }],
      colors: [{
        name: ''
      }]
    }]
  }
  id = 0;
  nomeFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  
  constructor(private router: Router, private api: ApiService, private ui: UiService, private activatedRoute: ActivatedRoute){

  }

  ngOnInit(){
    this.activatedRoute.params.subscribe((params: any) => {
      this.id = params["id"];
    })

    if(this.id != 0){
      this.api.getSaleId(this.id).subscribe(data => {
        this.model = data.data;
        console.log(this.model)
        this.model.products.forEach((element: any) => {
          if(!element.colors)
            element.colors = [];
        })
      })
    }

  }

  salvar(){
    if(this.id == 0){
      this.ui.block();
      
      this.api.createCategory(this.model).subscribe(data => {
        this.ui.unblock();
        if(data.sucess){
          this.ui.sucess('', 'Categoria cadastrada')
          this.router.navigate([this.router.url.split('/')[1] + "/"]);
        }
        else{
          this.ui.error('', data.message)
        }
      })
    }
    else{
      this.ui.block();
      this.api.updateCategory(this.id, this.model).subscribe(data => {
        this.ui.unblock();
        if(data.sucess){
          this.ui.sucess('', 'Categoria atualizada')
          this.router.navigate([this.router.url.split('/')[1] + "/"]);
        }
        else{
          this.ui.error('', data.message)
        }
      })
    }
    
  }

  cancelar(){
    this.router.navigate([this.router.url.split('/')[1] + "/"]);
  }

  confirmarPagamento(){
    if(this.model.paymentStatus ===  'Pago' ){
      this.api.cancelPayment(this.id).subscribe(data => {
        if(data.sucess){
          this.ui.sucess('', 'Pagamento cancelado')
          setTimeout(()=>{
            this.api.getSaleId(this.id).subscribe(data => {
              this.model = data.data;
            })
          }, 500);
        }
      })
      
    }
    else{
      this.api.changeStatusPayment(this.id).subscribe(data => {
        if(data.sucess){
          this.ui.sucess('', 'Pedido Pago')
          setTimeout(()=>{
            this.api.getSaleId(this.id).subscribe(data => {
              this.model = data.data;
            })
          }, 500);
        }
      })
    }
    
    
    
  }

  

  statusEntrega(){

    this.api.changeStatusDelivery(this.id).subscribe(data => {
      if(data.sucess){
        this.ui.sucess('', 'Pedido atualizado')

        setTimeout(()=>{
          this.api.getSaleId(this.id).subscribe(data => {
            this.model = data.data;
          })
        }, 500);
      }
    })
    
      
  }

}
