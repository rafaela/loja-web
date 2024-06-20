import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../MyErrorStateMatcher';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-highlights-edit',
  templateUrl: './highlights-edit.component.html',
  styleUrls: ['./highlights-edit.component.scss']
})
export class HighlightsEditComponent {
  panelOpenState = false;
  id = 0;

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
      this.api.getHighlightsByID(this.id).subscribe(data => {
        this.ui.unblock();
        this.model = data.data
      })
    }

  }


  validar(){
    if(this.model.name == '' || this.model.name == null){
      this.ui.error('', 'Informe o nome');
      return false;
    }
    return true;
  }

  salvar(){
    if(this.validar()){
      if(this.id == 0){
        this.ui.block();
        
        this.api.createHighlight(this.model).subscribe(data => {
          this.ui.unblock();
          if(data.sucess){
            this.ui.sucess('', 'Imagem cadastrada')
            this.router.navigate([this.router.url.split('/')[1] + "/"]);
          }
          else{
            this.ui.error('', data.message)
          }
        })
      }
      else{
        this.ui.block();
        this.api.updateHighlights(this.id, this.model).subscribe(data => {
          this.ui.unblock();
          if(data.sucess){
            this.ui.sucess('', 'Imagem atualizada')
            this.router.navigate([this.router.url.split('/')[1] + "/"]);
          }
          else{
            this.ui.error('', data.message)
          }
        })
      }
    }
  }

  fileImage(event: any): void {
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

  dataImages(image){
    this.model.image = image;
}

  cancelar(){
    this.router.navigate([this.router.url.split('/')[1] + "/"]);
  }
}
