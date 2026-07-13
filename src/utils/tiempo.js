module.exports = (inicio, fin = new Date()) => {

    const diferencia = fin - new Date(inicio);

    const horas = Math.floor(diferencia / 3600000);

    const minutos = Math.floor((diferencia % 3600000) / 60000);

    const segundos = Math.floor((diferencia % 60000) / 1000);

    return `${String(horas).padStart(2, "0")}:${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;

};