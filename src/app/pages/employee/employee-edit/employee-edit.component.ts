import { FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { MyErrorStateMatcher } from '../../MyErrorStateMatcher';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent {

  panelOpenState = false;
  isEdit: boolean = false
  id = 0;

  public model: any = {
    Login: {}
  }

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
      this.isEdit = true;
      this.api.getEMployeeByID(this.id).subscribe(data => {
        this.model = data.data;
        this.model.passwordHash = '';
        this.model.login = {};
      })
    }

    

  }

  validar(){
    if(this.model.name == '' || this.model.name == null){
      this.ui.error('', 'Informe o nome');
      return false;
    }

    if(this.model.phone == '' || this.model.phone == null){
      this.ui.error('', 'Informe o phone');
      return false;
    }
    if(this.model.cpf == '' || this.model.cpf == null){
      this.ui.error('', 'Informe o cpf');
      return false;
    }

    if(this.model.email == '' || this.model.email == null){
      this.ui.error('', 'Informe o email');
      return false;
    }

    if(this.model.passwordHash == '' || this.model.passwordHash == null){
      this.ui.error('', 'Informe a senha');
      return false;
    }
    return true;
  }

  salvar(){
    if(this.validar()){
      this.model.login.email = this.model.email;
      this.model.login.passwordHash = this.model.passwordHash;

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
    
    
  }

  cancelar(){
    this.router.navigate([this.router.url.split('/')[1] + "/"]);
  }

}
