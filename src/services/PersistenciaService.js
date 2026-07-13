const fs = require("fs");
const path = require("path");

const carpeta = path.join(process.cwd(), "data");

if (!fs.existsSync(carpeta)) {
    fs.mkdirSync(carpeta, { recursive: true });
}

const archivo = path.join(carpeta, "turnos_activos.json");

class PersistenciaService {

    static cargar() {

        if (!fs.existsSync(archivo)) {
            fs.writeFileSync(archivo, "{}");
        }

        return JSON.parse(fs.readFileSync(archivo, "utf8"));
    }

    static guardar(datos) {

        fs.writeFileSync(
            archivo,
            JSON.stringify(datos, null, 4)
        );

    }

    static agregarTurno(turno) {

        const datos = this.cargar();

        datos[turno.id] = turno;

        this.guardar(datos);

    }

    static eliminarTurno(usuarioId) {

        const datos = this.cargar();

        delete datos[usuarioId];

        this.guardar(datos);

    }

}

module.exports = PersistenciaService;