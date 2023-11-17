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
    password: ''
  }

  constructor(private api: ApiService, private router: Router, private ui: UiService){}

  ngOnInit() {
    
  }

  async onSubmit(){
    try{
      const result = await this.api.login(this.login);

      console.log(`Login efetuado: ${result}`);

      if(result){
        this.router.navigate(['']);
      }else{
        this.ui.error('E-mail e/ou senha incorretos', 'Login');
      }

      
    }catch(error){
      console.log(error)
    }

  }

}
