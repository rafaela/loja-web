import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UiService } from 'src/app/services/ui.service';
import { MyErrorStateMatcher } from '../../MyErrorStateMatcher';

@Component({
  selector: 'app-clients-edit',
  templateUrl: './clients-edit.component.html',
  styleUrls: ['./clients-edit.component.scss']
})
export class ClientsEditComponent implements OnInit{
  public model = {
    name: '',
    phone: '',
    cpf: '',
    email: '',
    birthDate: '',
    address: [{
      cep: '',
      city: '',
      complement: '',
      neighborhood: '',
      number: '',
      reference: '',
      state: '',
      street: '',
    }],
    
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
      this.api.getClientByID(this.id).subscribe(data => {
        this.model = data.data;
      })

      this.api.getAddressClientByID(this.id).subscribe(add => {
        this.model.address = add.data;
      })
    }

  }

  
  cancelar(){
    this.router.navigate([this.router.url.split('/')[1] + "/"]);
  }

  

}
