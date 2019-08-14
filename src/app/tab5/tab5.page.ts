import { Component, OnInit } from '@angular/core';
import { RespuestaAnime } from '../interfaces/interfaces';
import { ApiService } from '../services/api.service';
import { Routes } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  articles: RespuestaAnime;
  nombre: string;
  genero: string;
  horario: string;
  plataforma: string;
  id: number;
  dataFromService:any="";
  usuario1: string;
  miBuscador: string; 


  constructor(public nav: NavController, private animeCRUD: ApiService, private alertCtrl: AlertController) {}

  ngOnInit() {
    let usuario = localStorage.getItem("usuario");
    if(usuario == "user" || usuario == "admin"){
    } else { this.nav.navigateForward('/');}
    this.animeCRUD.traerAnimes()
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

  agregarAnime() {
    var dataToSend = {
      nombre: this.nombre,
      genero: this.genero,
      horario: this.horario,
      plataforma: this.plataforma
    };
    this.animeCRUD.agregarAnime(dataToSend).subscribe(
      (dataReturnFromService) => {
        this.dataFromService = JSON.stringify
        (dataReturnFromService);
        this.reload();
      });
  }

  eliminarAnime(id: string) {
    console.log(id);
    this.animeCRUD.eliminarAnime(id).subscribe(this.reload);
  }

  async editarAnime(editValor: string, nombre: string, genero: string, horario: string, plataforma: string) {
    const alertInput = await this.alertCtrl.create({
      header: 'Editar Anime',
      message: 'Llene los campos',
      inputs: [{
        name: 'nombre',
        type: 'text',
        placeholder: 'Escriba el nombre',
        value: nombre
      },
      {
        name: 'genero',
        type: 'text',
        placeholder: 'Escriba la descripción',
        value: genero
      },
      {
        name: 'horario',
        type: 'text',
        placeholder: 'Escriba la direccion',
        value: horario
      },
      {
        name: 'plataforma',
        type: 'text',
        placeholder: 'Escriba la plataforma',
        value: plataforma
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
              genero: datos.genero,
              horario: datos.horario,
              plataforma: datos.plataforma
            };
            console.log (dataToSend);
            this.animeCRUD.editarAnime(dataToSend, editValor).subscribe(
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
