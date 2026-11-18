const RSS_URL = "https://www.eltiempo.com/rss/cultura_arte-y-teatro.xml";
let novedadesCache = null;

const convertirNoticia = (item, index) => {

    const imagen = item.enclosure?.link || "";
    const fecha = item.pubDate || "";
    const descripcion = item.description || ""
    const link = item.link || "";
    const categoria = item.category || "";
    const titulo = item.title || "";

    return {
        id: index + 1,
        titulo: titulo,
        fecha: fecha,
        categoria: categoria,
        descripcion: descripcion,
        imagen: imagen,
        fuente: link
    };
};

const cargarNovedades= async ()=>{
    if (novedadesCache) return novedadesCache;
    const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Error consultando RSS");
    }
    const data = await response.json();
    if (data.status !== "ok") {
        throw new Error("Error convirtiendo RSS");
    }
    novedadesCache = data.items.map(convertirNoticia);
    return novedadesCache;
}
export const actualizarNovedades= async ()=>{
    const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Error consultando RSS");
    }
    const data = await response.json();
    if (data.status !== "ok") {
        throw new Error("Error convirtiendo RSS");
    }
    novedadesCache = data.items.map(convertirNoticia);
    return novedadesCache;
}

export const obtenerNovedades = async () => {
    return await cargarNovedades();
}

export const obtenerNovedadPorId = async (id) => {

    const novedades = await cargarNovedades();
    return novedades.find(
        (novedad) => novedad.id === Number(id)
    );
};