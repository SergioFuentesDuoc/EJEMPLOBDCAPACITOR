import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DbserviceService } from '../services/dbservice.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  noticias: any = [
    {
      titulo: "Titulo de la Noticia",
      texto: "Texto de la noticia que quiero que salga en el cuerpo del item"
    }
  ]

  constructor(private router: Router, private servicioBD: DbserviceService) {}

  ngOnInit(){
    //this.servicioBD.presentAlert("1");
    this.servicioBD.dbState().subscribe((res) =>{
      //this.servicioBD.presentAlert("2");
      if(res){
        //this.servicioBD.presentAlert("3");
        this.servicioBD.fetchNoticias().subscribe(item =>{
          this.noticias = item;
        })
      }
      //this.servicioBD.presentAlert("4");
    });
  }

  getItem($event) {
    const valor = $event.target.value;
    console.log('valor del control: ' + valor);

  }

  agregar() {

  }

  editar(item) {
    this.servicioBD.presentToast("Hola");
    let navigationextras: NavigationExtras = {
      state : {
        idEnviado : item.id,
        tituloEnviado : item.titulo,
        textoEnviado : item.texto
      }
    }
    this.servicioBD.presentToast("Aqui");
    this.router.navigate(['/modificar'],navigationextras);

  }

  eliminar(item) {
    this.servicioBD.deleteNoticia(item.id);
    this.servicioBD.presentToast("Noticia Eliminada");
  }

}
