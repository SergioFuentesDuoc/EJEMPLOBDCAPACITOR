import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Noticias } from './noticias';


@Injectable({
  providedIn: 'root'
})
export class DbserviceService {
  public database: SQLiteObject;

  tablaNoticias: string = "CREATE TABLE IF NOT EXISTS noticia(id INTEGER PRIMARY KEY autoincrement, titulo VARCHAR(50) NOT NULL, texto TEXT NOT NULL);";
  registro: string = "INSERT or IGNORE INTO noticia(id, titulo, texto) VALUES (1, 'Titulo noticia', 'Texto de la noticia que se quiere mostrar');";
  listaNoticias = new BehaviorSubject([]);

  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private sqlite: SQLite, private platform: Platform, public toastController: ToastController) {
    this.crearBD();
   }

   addNoticia(titulo,texto){
    let data=[titulo,texto];
    return this.database.executeSql('INSERT INTO noticia(titulo,texto) VALUES(?,?)',data)
    .then(res =>{
      this.buscarNoticias();
    })

  }

  updateNoticia(id, titulo, texto){
    let data = [titulo, texto, id];
    return this.database.executeSql('UPDATE noticia SET titulo = ?, texto = ? WHERE id = ?', data)
    .then(data2 =>{
      this.buscarNoticias();
    })

  }

  deleteNoticia(id){
    return this.database.executeSql('DELETE FROM noticia WHERE id = ?', [id])
    .then(a =>{
      this.buscarNoticias();
    })
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'noticias3.db',
        location: 'default'

      }).then((db: SQLiteObject) => {
        this.database = db;
        this.presentToast("BD Creada");
        //llamamos a la creación de tablas
        this.crearTablas();
      }).catch(e => this.presentToast(e));
    })
  }

  async crearTablas() {
    try {
      await this.database.executeSql(this.tablaNoticias, []);
      await this.database.executeSql(this.registro, []);
      this.presentToast("Tabla Creada");
      this.buscarNoticias();
      this.isDbReady.next(true);
    } catch (e) {
      this.presentToast("error creartabla " + e);
    }
  }

  buscarNoticias() {
    //this.presentAlert("a");
    return this.database.executeSql('SELECT * FROM noticia', []).then(res => {
      let items: Noticias[] = [];
      //this.presentAlert("b");
      if (res.rows.length > 0) {
        //this.presentAlert("c");
        for (var i = 0; i < res.rows.length; i++) {
          //this.presentAlert("d");
          items.push({
            id: res.rows.item(i).id,
            titulo: res.rows.item(i).titulo,
            texto: res.rows.item(i).texto
          });
        }
      }
      //this.presentAlert("d");
      this.listaNoticias.next(items);
    });
  }

  fetchNoticias(): Observable<Noticias[]> {
  return this.listaNoticias.asObservable();
  }

  async presentToast(mensaje: string) {
  const toast = await this.toastController.create({
    message: mensaje,
    duration: 3000
  });
  toast.present();
  }



}
