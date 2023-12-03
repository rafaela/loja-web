import { FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { MyErrorStateMatcher } from '../../MyErrorStateMatcher';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UiService } from 'src/app/services/ui.service';
import { Utils } from '../../common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import * as moment from 'moment';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent {

  panelOpenState = false;
  id;

  public model: any = {}

  nomeFormControl = new FormControl('', [Validators.required]);
  phoneFormControl = new FormControl('', [Validators.required, Validators.pattern(/\(\d{2}\) (\d )?\d{4}-\d{4}/)], );
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  cpfFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private api: ApiService, private ui: UiService, private activatedRoute: ActivatedRoute){

  }

 

  ngOnInit(){
    this.activatedRoute.params.subscribe((params: any) => {
      this.id = params["id"];
    })

    if(this.id != 0){
      this.ui.block();
      this.api.getEMployeeByID(this.id).subscribe(data => {
        this.ui.unblock();
        this.model = data.data
      })
    }

  }

  salvar(){
    console.log(this.model.birthDate)
    let login = {
      email: this.model.email,
      passwordHash: this.model.password
    }

    this.model.login = login

    

    if(this.id == 0){
      this.ui.block();
      this.api.createEmployee(this.model).subscribe(data => {
        this.ui.unblock();
        if(data.sucess){
          this.ui.sucess('', 'Funcionário cadastrado')
          this.router.navigate([this.router.url.split('/')[1] + "/"]);
        }
        else{
          this.ui.error('', data.message)
        }
      })
    }
    else{
      this.ui.block();
      this.api.updateEmployee(this.id, this.model).subscribe(data => {
        this.ui.unblock();
        if(data.sucess){
          this.ui.sucess('', 'Funcionário atualizado')
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

}
