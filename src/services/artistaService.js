import artistasData from "../data/artistasData.json"

export const obtenerArtistas = async () => {
    return artistasData;
}

export const obtenerArtistaPorId = async (id) => {
    return artistasData.find((artista) => artista.id === id);
}