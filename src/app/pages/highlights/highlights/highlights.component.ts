import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { DialogDeleteComponent } from 'src/app/components/dialog-delete/dialog-delete.component';
import { ApiService } from 'src/app/services/api.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-highlights',
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.scss']
})
export class HighlightsComponent {

  highlightsList: any = [];
  name = '';
  _columns: string[] = ['Ações', 'Nome', 'Inativo'];
  total = 0;
  data: any = {
    data: {
      name: null,
      incativc: false
    },
    skip: 0,
    take: 20,
  };
  pageSize = 20;
  @ViewChild(MatPaginator) paginator = MatPaginator;

  ngAfterViewInit() {
    this.highlightsList.paginator = this.paginator;
  }


  constructor(private cdr: ChangeDetectorRef, private api: ApiService, private ui: UiService, 
        private router: Router, public dialog: MatDialog){

  }

  ngOnInit() {
    
    this.buscaDados();
    this.cdr.detectChanges();
  }

  buscaDados(){
    this.ui.block();

    this.data.skip = 0;
    this.data.take = this.pageSize;

    this.api.getHighlights(this.data).subscribe(data => {
      this.highlightsList = data.data;
      this.total = data.total;
      this.formataDados(this.highlightsList)
      this.ui.unblock();
    })
  }

  formataDados(highlightsList){
    highlightsList.forEach(element => {
      if(element.inactive){
        element.inactive = 'Sim'
      }
      else{
        element.inactive = 'Não'
      }
    })
  }
  
  delete(id, enterAnimationDuration, exitAnimationDuration){

    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(data =>{
      if(data){
        this.api.deleteHighlights(id).subscribe(data => {
          if(data.sucess){
            this.ui.sucess('', 'Imagem removida')
            this.buscaDados();
          }
          else
            this.ui.error('', data.message)
        })
      }
    });

  }
  
  rowSelected(row){
  }

  inserir(){
    this.router.navigate([this.router.url + '/0']);
  }

  limpar(){
      this.data.data = {};
  }

  pesquisar(){
    this.ui.block();
    this.api.getHighlights(this.data).subscribe(data => {
      this.highlightsList = data.data;
      this.total = data.total;

      this.formataDados(this.highlightsList)
      this.ui.unblock();
    })
  }

  getPaginatorData(event){
    this.data.skip = event.pageIndex * event.pageSize;
    this.data.take = event.pageSize;
    this.pesquisar();
  }

}
