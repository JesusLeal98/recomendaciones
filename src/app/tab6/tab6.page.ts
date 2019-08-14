import { Component, OnInit } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { Router } from  "@angular/router";
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { Usuario } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page implements OnInit {
  urlapi: string;
  usuario1: string;
  data:any={};
  url;
  username: string;
  articles: Usuario;
  nombre: string;
  password: string;
  rol: string;
  id: number;
  dataFromService:any="";
  miBuscador: string; 
  editValor: string;

  constructor(public http:  HttpClient,public nav: NavController,private usuarioCRUD: ApiService, private alertCtrl: AlertController) { 
    this.data.password = '';
    this.data.usuario = '';
    this.data.rol = '';
  }

  ngOnInit() {
    let usuario = localStorage.getItem("usuario");
    if(usuario == "user" || usuario == "admin"){
    } else { this.nav.navigateForward('/');}
    this.usuario1 = usuario;
    console.log(this.usuario1);
    this.usuarioCRUD.traerUsuario()
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
  aceptar() {
    localStorage.setItem("usuario", "cerrado");
    this.nav.navigateForward('/');
  }
  modificar() {
    let urlapi = localStorage.getItem("link");
    let username = localStorage.getItem("username");
    this.url = urlapi;
    console.log(this.url);
    this.http.post((this.url+'/up/'+ username), this.data)
    .subscribe(data => {
      console.log(data);
        this.nav.navigateForward('/');
        this.reload();
     }, error => {
      console.log(error);
    });
  }

  
  agregarUsuario() {
    var dataToSend = {
      username: this.nombre,
      password: this.password,
      rol: this.rol,
    };
    this.usuarioCRUD.agregarUsuario(dataToSend).subscribe(
      (dataReturnFromService)=>{
        this.dataFromService = JSON.stringify
        (dataReturnFromService);
        this.reload();
      });
  }

  eliminarUsuario(id: string) {
    console.log(id);
    this.usuarioCRUD.eliminarUsuario(id).subscribe(this.reload);
  }

  async editarUsuario(editValor: string, username: string, password: string, rol: string) {
    const alertInput = await this.alertCtrl.create({
      header: 'Editar Personal',
      message: 'Llene los campos',
      inputs: [{
        name: 'username',
        type: 'text',
        placeholder: 'Escriba el nombre',
        value: username
      },
      {
        name: 'password',
        type: 'text',
        placeholder: 'Escriba la descripción',
        value: password
      },
      {
        name: 'rol',
        type: 'text',
        placeholder: 'Escriba el rol',
        value: rol
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
              username: datos.username,
              password: datos.password,
              rol: datos.rol
            };
            console.log (dataToSend);
            this.usuarioCRUD.editarUsuario(dataToSend, editValor).subscribe(
              (dataReturnFromService)=>{
                this.dataFromService = JSON.stringify
                (dataReturnFromService);
                //console.log(password);
                this.reload();
              });
            console.log(editValor);
          }
        }
      ]
    });
    await alertInput.present();
  }

}
