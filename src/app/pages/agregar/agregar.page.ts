import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/services/dbservice.service';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  tituloNoticia = "";
  textoNoticia = "";

  constructor(private dbservice: DbserviceService, private router: Router) { }

  guardar() {
    this.dbservice.addNoticia(this.tituloNoticia,this.textoNoticia);
    this.dbservice.presentToast("Noticia Agregada");
    this.router.navigate(['/home']);
  }

  ngOnInit() {
  }

}
