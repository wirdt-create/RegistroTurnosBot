const turnos = new Map();
const PersistenciaService = require("./PersistenciaService");


class TurnoService {

    static iniciar(interaction) {

        const usuario = interaction.user.id;

        if (turnos.has(usuario)) {

            return {
                ok: false,
                mensaje: "❌ Ya te encuentras en servicio."
            };

        }

        const inicio = new Date();

     /*   turnos.set(usuario, {

            inicio

        });*/



        turnos.set(usuario, {

         id: interaction.user.id,

         tag: interaction.user.tag,

         displayName: interaction.member.displayName,

         inicio,

         guildId: interaction.guild.id

        });

        PersistenciaService.agregarTurno({

        id: interaction.user.id,

        tag: interaction.user.tag,

        displayName: interaction.member.displayName,

        inicio,

       guildId: interaction.guild.id

        });

        return {

            ok: true,

            inicio

        };

    }

   static salir(interaction) {

    const usuario = interaction.user.id;

    if (!turnos.has(usuario)) {

        return {

            ok: false,

            mensaje: "❌ No tienes un turno iniciado."

        };

    }

    const datos = turnos.get(usuario);

    turnos.delete(usuario);
    PersistenciaService.eliminarTurno(usuario);

    return {

        ok: true,

        inicio: datos.inicio,

        fin: new Date()

    };

}
static cargarTurnos(datos) {

    turnos.clear();

    for (const id in datos) {

        turnos.set(id, {

            ...datos[id],

            inicio: new Date(datos[id].inicio)

        });

    }

}

static obtenerTurnosActivos() {

    return turnos;

}
static listar() {

    return Array.from(turnos.values());

}
}


module.exports = TurnoService;