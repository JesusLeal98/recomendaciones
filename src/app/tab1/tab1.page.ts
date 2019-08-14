import { Component, OnInit } from '@angular/core';
import { RespuestaPeliculas } from '../interfaces/interfaces';
import { ApiService } from '../services/api.service';
import { Routes } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
//  const url1: string;
export class Tab1Page implements OnInit {
  articles: RespuestaPeliculas;
  nombre: string;
  descripcion: string;
  genero: string;
  anno: string;
  id: number;
  dataFromService: any="";
  url1: string;
  usuario1: string;
  miBuscador: string;


  constructor(public nav: NavController, private peliculaCRUD: ApiService, private alertCtrl: AlertController) {}

  obtenerURL() {
    let urlapi = localStorage.getItem("link");
    this.url1 = urlapi;
    this.url1 =  "http://15b119f5.ngrok.io/";
}

  ngOnInit() {
    let usuario = localStorage.getItem("usuario");
    if (usuario == "user" || usuario == "admin"){
    } else { this.nav.navigateForward('/'); }
    this.peliculaCRUD.traerPeliculas()
    .subscribe(metodo => {
      console.log(metodo);
      this.articles = metodo;
      this.usuario1 = usuario;
    });
    this.obtenerURL();
    this.miBuscador = "";
  }

  reload() {
    window.location.reload();
  }

  agregarPeliculas() {
    var dataToSend = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      genero: this.genero,
      anno: this.anno
    };
    this.peliculaCRUD.agregarPeliculas(dataToSend).subscribe(
      (dataReturnFromService) => {
        this.dataFromService = JSON.stringify
        (dataReturnFromService);
        this.reload();
      });
  }

  eliminarPelicula(id: string) {
    console.log(id);
    this.peliculaCRUD.eliminarPelicula(id).subscribe(this.reload);
  }

  async editarPelicula(editValor: string, nombre: string, descripcion: string, genero: string, anno: string) {
    const alertInput = await this.alertCtrl.create({
      header: 'Editar Personal',
      message: 'Llene los campos',
      inputs: [{
        name: 'Nombre',
        type: 'text',
        placeholder: 'Escriba el nombre',
        value: nombre
      },
      {
        name: 'Descripcion',
        type: 'text',
        placeholder: 'Escriba la descripcion',
        value: descripcion
      },
      {
        name: 'Genero',
        type: 'text',
        placeholder: 'Escriba el genero',
        value: genero
      },
      {
        name: 'Anno',
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
              nombre: datos.Nombre,
              descripcion: datos.Descripcion,
              genero: datos.Genero,
              anno: datos.Anno
            };
            console.log (dataToSend);
            this.peliculaCRUD.editarPelicula(dataToSend, editValor).subscribe(
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
