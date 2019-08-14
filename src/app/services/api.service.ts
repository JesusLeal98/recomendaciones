import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { RespuestaPeliculas, RespuestaSeries, RespuestaVideojuegos, RespuestaStreamers, RespuestaAnime, Usuario } from '../interfaces/interfaces';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    ruta: string;
    url: string;

    constructor(public http: HttpClient) { }

    obtenerURL() {
        let urlapi = localStorage.getItem("link");
        this.ruta = urlapi;
    }

    //anime
    traerAnimes() {
        this.obtenerURL();
        return this.http.get<RespuestaAnime>(this.ruta + "/anime");
    }

    agregarAnime(dataToSend) {
        this.obtenerURL();
        return this.http.post((this.ruta + "/anime"), dataToSend,
        {headers: new HttpHeaders(
        {"content-Type": "application/json"})});
    }

    editarAnime(dataToSend, editValor: string) {
        this.obtenerURL();
        var url = ((this.ruta + "/anime") + '/' + editValor );
        return this.http.post(url, dataToSend,
        {
        headers: new HttpHeaders().set('Authorization', 'my-token-de-autoriazación'),
        params: new HttpParams().set('id', editValor),
        });
    }

    eliminarAnime(editValor: string) {
        this.obtenerURL();
        var url = ((this.ruta + "/animeeliminar") + '/' + editValor );
        return this.http.get(url,
        {
        params: new HttpParams().set('id', editValor),
        });
    }
    //pelicula
    traerPeliculas() {
        this.obtenerURL();
        return this.http.get<RespuestaPeliculas>(this.ruta + "/pelicula");
    }
    agregarPeliculas(dataToSend) {
        this.obtenerURL();
        return this.http.post((this.ruta + "/pelicula"),dataToSend,
        {headers: new HttpHeaders(
        {"content-Type": "application/json"})});
    }
    editarPelicula(dataToSend, editValor: string) {
        this.obtenerURL();
        var url = ((this.ruta + "/pelicula") + '/' + editValor );
        return this.http.post(url, dataToSend,
        {
        headers: new HttpHeaders().set('Authorization', 'my-token-de-autoriazación'),
        params: new HttpParams().set('id', editValor),
        });
    }
    eliminarPelicula(editValor: string) {
        this.obtenerURL();
        var url = (this.ruta + "/peliculaeliminar" + '/' + editValor );
        return this.http.get(url,
        {
        params: new HttpParams().set('id', editValor),
        });
    }
    //series
    traerSeries() {
        this.obtenerURL();
        return this.http.get<RespuestaSeries>(this.ruta + "/serie");
    }
    agregarSeries(dataToSend) {
        this.obtenerURL();
        return this.http.post((this.ruta + "/serie"), dataToSend,
        {headers:new HttpHeaders(
        {"content-Type": "application/json"})});
    }
    editarSeries(dataToSend, editValor: string) {
        this.obtenerURL();
        var url = ((this.ruta + "/serie") + '/' + editValor );
        return this.http.post(url,dataToSend,
        {
        headers: new HttpHeaders().set('Authorization', 'my-token-de-autoriazación'),
        params: new HttpParams().set('id', editValor),
        });
    }
    eliminarSeries(editValor: string) {
        this.obtenerURL();
        var url = (this.ruta + "/serieeliminar" + '/' + editValor );
        return this.http.get(url,
        {
        params: new HttpParams().set('id', editValor),
        });
    }
    //streamers
    traerStreamers() {
        this.obtenerURL();
        return this.http.get<RespuestaStreamers>(this.ruta + "/streamer");
    }
    agregarStreamers(dataToSend) {
        this.obtenerURL();
        return this.http.post((this.ruta + "/streamer"), dataToSend,
        {headers: new HttpHeaders(
        {"content-Type": "application/json"})});
    }
    editarStreamers(dataToSend, editValor: string) {
        this.obtenerURL();
        var url = ((this.ruta + "/streamer") + '/' + editValor );
        return this.http.post(url, dataToSend,
        {
        headers: new HttpHeaders().set('Authorization', 'my-token-de-autoriazación'),
        params: new HttpParams().set('id', editValor),
        });
    }
    eliminarStreamers(editValor: string) {
        this.obtenerURL();
        var url = (this.ruta + "/streamereliminar" + '/' + editValor );
        return this.http.get(url,
        {
        params: new HttpParams().set('id', editValor),
        });
    }
    //videojuegos
    traerVideojuegos() {
        this.obtenerURL();
        return this.http.get<RespuestaVideojuegos>(this.ruta + "/videojuego");
    }
    agregarVideojuegos(dataToSend) {
        this.obtenerURL();
        return this.http.post((this.ruta + "/videojuego"), dataToSend,
        {headers: new HttpHeaders(
        {"content-Type": "application/json"})});
    }
    editarVideojuegos(dataToSend, editValor: string) {
        this.obtenerURL();
        var url = ((this.ruta + "/videojuego") + '/' + editValor );
        return this.http.post(url, dataToSend,
        {
        headers: new HttpHeaders().set('Authorization', 'my-token-de-autoriazación'),
        params: new HttpParams().set('id', editValor),
        });
    }
    eliminarVideojuegos(editValor: string) {
        this.obtenerURL();
        var url = (this.ruta + "/videojuegoeliminar" + '/' + editValor );
        return this.http.get(url,
        {
        params: new HttpParams().set('id', editValor),
        });
    }

    //Usuario
    traerUsuario() {
        this.obtenerURL();
        return this.http.get<Usuario>(this.ruta + "/usuario");
    }
    agregarUsuario(dataToSend) {
        this.obtenerURL();
        return this.http.post((this.ruta + "/usuario"),dataToSend,
        {headers: new HttpHeaders(
        {"content-Type": "application/json"})});
    }
    editarUsuario(dataToSend, editValor: string) {
        this.obtenerURL();
        var url = ((this.ruta + "/usuario") + '/' + editValor );
        return this.http.post(url, dataToSend,
        {
        headers: new HttpHeaders().set('Authorization', 'my-token-de-autoriazación'),
        params: new HttpParams().set('id', editValor),
        });
    }
    eliminarUsuario(editValor: string) {
        this.obtenerURL();
        var url = (this.ruta + "/usuarioeliminar" + '/' + editValor );
        return this.http.get(url,
        {
        params: new HttpParams().set('id', editValor),
        });
    }
}
