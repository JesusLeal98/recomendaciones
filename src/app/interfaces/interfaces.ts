export interface Usuario {
    usuarios: ConstructorUsuarios[];
}

export interface ConstructorUsuarios {
    id: number;
    nombre: string;
    password: string;
    rol: string;
    // created_at: string;
    // updated_at: string;
}

export interface RespuestaPeliculas {
    peliculas: Peliculas[];
}

export interface Peliculas {
    id: number;
    created_at: string;
    update_at: string;
    nombre: string;
    descripcion: string;
    genero: string;
    anno: string;
}

// Series

export interface RespuestaSeries {
    series: Series[];
}

export interface Series {
    id: number;
    created_at: string;
    update_at: string;
    nombre: string;
    descripcion: string;
    plataforma: string;
    temporadas: string;
}

// Videojuegos

export interface RespuestaVideojuegos {
    videojuegos: VideoJuegos[];
}

export interface VideoJuegos {
    id: number;
    created_at: string;
    update_at: string;
    nombre: string;
    descripcion: string;
    desarrolladora: string;
    anno: string;
}

// Streamers

export interface RespuestaStreamers {
    streamers: Streamers[];
}

export interface Streamers {
    id: number;
    created_at: string;
    update_at: string;
    nombre: string;
    suscriptores: string;
    horario: string;
    plataforma: string;
}

// Anime

export interface RespuestaAnime {
    anime: Anime[];
}

export interface Anime {
    id: number;
    created_at: string;
    update_at: string;
    nombre: string;
    genero: string;
    horario: string;
    plataforma: string;
}
