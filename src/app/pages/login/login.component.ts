import { UiService } from 'src/app/services/ui.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  login = {
    email: '',
    passwordHash: ''
  }

  constructor(private api: ApiService, private router: Router, private ui: UiService){}

  ngOnInit() {
    
  }

  async entrar(){
    try{
      if(this.login.email.includes("@")){
        const result = await this.api.login(this.login);

        if(result){
          this.router.navigate(['']);
        }else{
          this.ui.error('E-mail e/ou senha incorretos', 'Login');
        }
      }
      else{
        this.ui.error('Formato de email inválido', 'Login');
      }
    }catch(error){
      this.ui.error(error, 'Login')
    }

  }

}
