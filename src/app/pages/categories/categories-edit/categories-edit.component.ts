import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UiService } from 'src/app/services/ui.service';
import { MyErrorStateMatcher } from '../../MyErrorStateMatcher';




@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.scss'],
  providers: [ApiService]
})
export class CategoriesEditComponent implements OnInit{
  panelOpenState = false;
  id;

  public model: any = {}

  nomeFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  
  constructor(private router: Router, private api: ApiService, private ui: UiService, private activatedRoute: ActivatedRoute){

  }

  ngOnInit(){
    this.activatedRoute.params.subscribe((params: any) => {
      this.id = params["id"];
    })

    if(this.id != 0){
      this.ui.block();
      this.api.getCategoryByID(this.id).subscribe(data => {
        this.ui.unblock();
        this.model = data.data
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

}