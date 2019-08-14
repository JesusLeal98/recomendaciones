import { Component, OnInit } from '@angular/core';
import { RespuestaStreamers } from '../interfaces/interfaces';
import { ApiService } from '../services/api.service';
import { Routes } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit {

  articles: RespuestaStreamers;
  nombre: string;
  suscriptores: string;
  horario: string;
  plataforma: string;
  id: number;
  dataFromService:any="";
  usuario1: string;
  miBuscador: string;


  constructor(public nav: NavController,private streamerCRUD: ApiService, private alertCtrl: AlertController) {}

  ngOnInit() {
    let usuario = localStorage.getItem("usuario");
    if(usuario == "user" || usuario == "admin"){
    } else { this.nav.navigateForward('/');}
    this.streamerCRUD.traerStreamers()
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

  agregarStreamers() {
    var dataToSend = {
      nombre: this.nombre,
      suscriptores: this.suscriptores,
      horario: this.horario,
      plataforma: this.plataforma
    };
    this.streamerCRUD.agregarStreamers(dataToSend).subscribe(
      (dataReturnFromService) => {
        this.dataFromService = JSON.stringify
        (dataReturnFromService);
        this.reload();
      });
  }

  eliminarStreamers(id: string) {
    console.log(id);
    this.streamerCRUD.eliminarStreamers(id).subscribe(this.reload);
  }

  async editarStreamers(editValor: string, nombre: string, suscriptores: string, horario: string, plataforma: string) {
    const alertInput = await this.alertCtrl.create({
      header: 'Editar Streamer',
      message: 'Llene los campos',
      inputs: [{
        name: 'nombre',
        type: 'text',
        placeholder: 'Escriba el nombre',
        value: nombre
      },
      {
        name: 'suscriptores',
        type: 'text',
        placeholder: 'Escriba los suscriptores',
        value: suscriptores
      },
      {
        name: 'horario',
        type: 'text',
        placeholder: 'Escriba el horario',
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
              suscriptores: datos.suscriptores,
              horario: datos.horario,
              plataforma: datos.plataforma
            };
            console.log (dataToSend);
            this.streamerCRUD.editarStreamers(dataToSend, editValor).subscribe(
              (dataReturnFromService) => {
                this.dataFromService = JSON.stringify
                (dataReturnFromService);
                this.reload();
              });
            console.log('Se acepto la acción');
            console.log('Se acepto la acción');
          }
        }
      ]
    });
    await alertInput.present();
  }

}
