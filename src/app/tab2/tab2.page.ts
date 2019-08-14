import { Component, OnInit } from '@angular/core';
import { RespuestaSeries } from '../interfaces/interfaces';
import { ApiService } from '../services/api.service';
import { Routes } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  
  articles: RespuestaSeries;
  nombre: string;
  descripcion: string;
  plataforma: string;
  temporadas: string;
  id: number;
  dataFromService:any="";
  usuario1: string;
  miBuscador: string;

  constructor(public nav: NavController,private serieCRUD: ApiService, private alertCtrl: AlertController) {}

  ngOnInit() {
    let usuario = localStorage.getItem("usuario");
    if(usuario == "user" || usuario == "admin"){
    } else { this.nav.navigateForward('/');}
    this.serieCRUD.traerSeries()
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

  agregarSeries() {
    var dataToSend = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      plataforma: this.plataforma,
      temporadas: this.temporadas
    };
    this.serieCRUD.agregarSeries(dataToSend).subscribe(
      (dataReturnFromService) => {
        this.dataFromService = JSON.stringify
        (dataReturnFromService);
        this.reload();
      });
  }

  eliminarSeries(id: string) {
    console.log(id);
    this.serieCRUD.eliminarSeries(id).subscribe(this.reload);
  }

  async editarSeries(editValor: string, nombre: string, descripcion: string, plataforma: string, temporadas: string) {
    const alertInput = await this.alertCtrl.create({
      header: 'Editar Series',
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
        name: 'plataforma',
        type: 'text',
        placeholder: 'Escriba la plataforma',
        value: plataforma
      },
      {
        name: 'temporadas',
        type: 'text',
        placeholder: 'Escriba el temporadas',
        value: temporadas
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
              plataforma: datos.plataforma,
              temporadas: datos.temporadas
            };
            console.log (dataToSend);
            this.serieCRUD.editarSeries(dataToSend, editValor).subscribe(
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
