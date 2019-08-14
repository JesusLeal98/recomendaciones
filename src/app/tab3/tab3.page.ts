import { Component, OnInit } from '@angular/core';
import { RespuestaVideojuegos } from '../interfaces/interfaces';
import { ApiService } from '../services/api.service';
import { Routes } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  articles: RespuestaVideojuegos;
  nombre: string;
  descripcion: string;
  desarrolladora: string;
  anno: string;
  id: number;
  dataFromService:any="";
  usuario1: string;
  miBuscador: string;
  
  constructor(public nav: NavController,private videojuegoCRUD: ApiService, private alertCtrl: AlertController) {}

  ngOnInit() {
    let usuario = localStorage.getItem("usuario");
    if(usuario == "user" || usuario == "admin"){
    } else { this.nav.navigateForward('/');}
    this.videojuegoCRUD.traerVideojuegos()
    .subscribe(metodo => {
      console.log(metodo);
      this.articles = metodo;
      this.usuario1 = usuario;
    });
    this.miBuscador = "";
  }

  reload() {
    window.location.reload();
  }

  agregarVideojuegos() {
    var dataToSend = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      desarrolladora: this.desarrolladora,
      anno: this.anno
    };
    this.videojuegoCRUD.agregarVideojuegos(dataToSend).subscribe(
      (dataReturnFromService) => {
        this.dataFromService = JSON.stringify
        (dataReturnFromService);
        this.reload();
      });
  }

  eliminarVideojuegos(id: string) {
    console.log(id);
    this.videojuegoCRUD.eliminarVideojuegos(id).subscribe(this.reload);
  }

  async editarVideojuegos(editValor: string, nombre: string, descripcion: string, desarrolladora: string, anno: string) {
    const alertInput = await this.alertCtrl.create({
      header: 'Editar Video Juego',
      message: 'Llene los campos',
      inputs: [{
        name: 'nombre',
        type: 'text',
        placeholder: 'Escriba el nombre',
        value: nombre
      },
      {
        name: 'descripcion',
        type: 'text',
        placeholder: 'Escriba la descripción',
        value: descripcion
      },
      {
        name: 'desarrolladora',
        type: 'text',
        placeholder: 'Escriba la desarrolladora',
        value: desarrolladora
      },
      {
        name: 'anno',
        type: 'text',
        placeholder: 'Escriba el año',
        value: anno
      }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'Cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Se cancelo la acción');
          }
        }, {
          text: 'Aceptar',
          handler: (datos) => {
            var dataToSend = {
              nombre: datos.nombre,
              descripcion: datos.descripcion,
              desarrolladora: datos.desarrolladora,
              anno: datos.anno
            };
            console.log (dataToSend);
            this.videojuegoCRUD.editarVideojuegos(dataToSend, editValor).subscribe(
              (dataReturnFromService) => {
                this.dataFromService = JSON.stringify
                (dataReturnFromService);
                this.reload();
              });
            console.log('Se acepto la acción');
          }
        }
      ]
    });
    await alertInput.present();
  }

}
