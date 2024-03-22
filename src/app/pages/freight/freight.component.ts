import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UiService } from 'src/app/services/ui.service';
import { UploadService } from 'src/app/services/upload.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-freight',
  templateUrl: './freight.component.html',
  styleUrls: ['./freight.component.scss']
})
export class FreightComponent {
  public model: any = {
    valuePriceFreeShipping: 0,
    cities: []
  }
  public categoriesList;
  isEdit = false;
  id = 0;

  
  constructor(private router: Router, private api: ApiService, private ui: UiService){

  }

  ngOnInit(){
    this.ui.block();
    this.api.getFreigthByID(this.id).subscribe(data => {
      this.ui.unblock();
      if(data.data){
        this.model = data.data
        this.id = this.model.id;
        if(!this.model.cities){
          this.model.cities = []
        }
      }
    })

  }

  newCity(){
    this.model.cities.push({
      cep: ''
    })  
}

  salvar(){
    
    if(this.model.valuePriceFreeShipping == ""){
      this.model.valuePriceFreeShipping = 0;
    }
    if(this.id == 0){
      this.ui.block();
      this.api.createFreigth(this.model).subscribe(data => {
        this.ui.unblock();
        if(data.sucess){
          this.ui.sucess('', 'Frete cadastrado')
          this.router.navigate([this.router.url.split('/')[0] + "/"]);
        }
        else{
          this.ui.error('', data.message)
          this.router.navigate([this.router.url.split('/')[0] + "/"]);
        }
      })
    }
    else{
      this.ui.block();
      this.api.updateFreigth(this.id, this.model).subscribe(data => {
        this.ui.unblock();
        if(data.sucess){
          this.ui.sucess('', 'Frete atualizado')
          this.router.navigate([this.router.url.split('/')[0] + "/"]);
        }
        else{
          this.ui.error('', data.message)
          this.router.navigate([this.router.url.split('/')[0] + "/"]);
        }
      })
    }
  }

  cancelar(){
    this.router.navigate([this.router.url.split('/')[0] + "/home"]);
  }
}
