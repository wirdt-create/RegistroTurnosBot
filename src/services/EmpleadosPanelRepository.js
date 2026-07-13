const fs = require("fs");
const path = require("path");

const archivo = path.join(__dirname, "../../data/empleados_panel.json");

class EmpleadosPanelRepository {

    static leer() {

        if (!fs.existsSync(archivo)) {

            fs.writeFileSync(
                archivo,
                JSON.stringify({
                    channelId: null,
                    messageId: null
                }, null, 4)
            );

        }

        return JSON.parse(fs.readFileSync(archivo, "utf8"));

    }

    static guardar(datos) {

        fs.writeFileSync(
            archivo,
            JSON.stringify(datos, null, 4)
        );

    }

    static registrar(channelId, messageId) {

        this.guardar({

            channelId,
            messageId

        });

    }

    static obtener() {

        return this.leer();

    }

    static existe() {

        const datos = this.leer();

        return datos.channelId !== null && datos.messageId !== null;

    }

}

module.exports = EmpleadosPanelRepository;