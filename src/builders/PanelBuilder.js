const calcularTiempo = require("../utils/tiempo");

class PanelBuilder {

    static generar(turnos) {

        if (turnos.size === 0) {

            return {
                descripcion: "❌ Actualmente no hay empleados en servicio.",
                total: 0
            };

        }

        let descripcion = "";

        for (const turno of turnos.values()) {

           descripcion +=
`🟢 **${turno.displayName}**
╰ 🕒 ${calcularTiempo(turno.inicio)}

`;

        }

        return {

            descripcion,

            total: turnos.size

        };

    }

}

module.exports = PanelBuilder;