import { UiService } from './../../../services/ui.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UploadService } from 'src/app/services/upload.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.scss']
})
export class ProductsEditComponent implements OnInit{
  caminho


  public model: any = {
    photos: [{
      id: null,
      productId: null,
      urlImage: null,
      inactive: false
    }],
    subcategoriesProducts: [{
      id: null,
      subcategoryId: null,
      productId: null,
    }]
  }
  public subcategoriesproduct: any = [];
  public categoriesList;
  public subcategories
  id;
  images: any = [];

  isEdit = false;

  nomeFormControl = new FormControl('', [Validators.required]);
  valorFormControl = new FormControl('', [Validators.required]);
  amountFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();
  
  constructor(private router: Router, private api: ApiService, private ui: UiService, 
        private activatedRoute: ActivatedRoute, private uploadService: UploadService){

  }

  ngOnInit(){
    this.ui.block();
    this.api.getCategories().subscribe(data => {
      this.ui.unblock();
      this.categoriesList = data.data
    })
    

    this.activatedRoute.params.subscribe((params: any) => {
      this.id = params["id"];
    })

    if(this.id != 0){
      this.ui.block();
      this.api.getProductByID(this.id).subscribe(data => {
        this.ui.unblock();
        this.model = data.data
        console.log(this.model)
        this.buscaSubcategorias(this.model.categoryID)

        for(let i = 0; i < this.model.subcategoriesProducts.length; i++){
          this.subcategoriesproduct.push(this.model.subcategoriesProducts[i].subcategoryId);
        }
        

      })
    }

  }

  removerImagem(image){
    this.ui.block();
    this.api.deleteImage(image.id).subscribe(data => {
      this.ui.unblock();
      if(data.sucess){
        this.ui.sucess('', 'Imagem removida')
      }
      else{
        this.ui.error('', data.message)
      }
    })
  }

  fileImage(event: any): void {
    if(!this.model.photos){
      this.model.photos = [];
    }
    const selectFiles = event.srcElement.files;
    if(selectFiles){
      for(var i = 0, f; f = selectFiles[i]; i++){
        if (f.type.match('image/')) {//verifica se os arquivos são imagens
          var reader = new FileReader();
          reader.onload = (e: any) => {
            this.dataImages(e.target.result)
          }
          reader.readAsDataURL(f);
        }
        else{
          this.ui.error('Arquivo inválido', 'Selecione apenas imagens')
          return
        } 
      }
    }
  }

  tratandoSubcategorias(){
    if(this.subcategoriesproduct){
      for(let i = 0; i < this.subcategoriesproduct.length; i++){
        this.model.subcategoriesProducts.push({
          id: null,
          subcategoryId: this.subcategoriesproduct[i],
          productId: this.id == 0 ? null : this.id,
        })
      }
    }
  }

  dataImages(image){
      this.model.photos.push({
        urlImage: image,
        inactive: false
      })
  }


  buscaSubcategorias(category){
    console.log(category)
    this.ui.block();
    this.api.getSubcategoriesByID(category).subscribe( data => {
      this.ui.unblock();
      if(data.sucess){
        this.subcategories = data.data;

        console.log(this.subcategories)
      }
      else{
        this.ui.error('', data.message)
      }
    })
  }


  salvar(){
    this.tratandoSubcategorias();
    console.log(this.model)
    if(this.id == 0){
      this.ui.block();
      this.api.createProduct(this.model).subscribe(data => {
        this.ui.unblock();
        if(data.sucess){
          this.ui.sucess('', 'Produto cadastrado')
          this.router.navigate([this.router.url.split('/')[1] + "/"]);
        }
        else{
          this.ui.error('', data.message)
        }
      })
    }
    else{
      this.ui.block();
      this.api.updateProduct(this.id, this.model).subscribe(data => {
        this.ui.unblock();
        if(data.sucess){
          this.ui.sucess('', 'Produto atualizado')
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
