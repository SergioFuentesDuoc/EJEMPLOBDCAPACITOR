import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class ModificarPage implements OnInit {

  idNoticia = "";
  tituloNoticia = "";
  textoNoticia = "";

  constructor(private router:Router, private activedroute: ActivatedRoute, private dbservice: DbserviceService) {
    this.activedroute.queryParams.subscribe(param =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.idNoticia = this.router.getCurrentNavigation().extras.state.idEnviado;
        this.tituloNoticia = this.router.getCurrentNavigation().extras.state.tituloEnviado;
        this.textoNoticia = this.router.getCurrentNavigation().extras.state.textoEnviado;
      }
    })
  }

  editar(){
    this.dbservice.updateNoticia(this.idNoticia, this.tituloNoticia,this.textoNoticia);
    this.dbservice.presentToast("Noticia Modificada");
    this.router.navigate(['/home']);
  }

  ngOnInit() {
  }

}
