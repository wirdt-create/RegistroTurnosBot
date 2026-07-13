const empleadosPanelEmbed = require("../embeds/empleadosPanelEmbed");
const PanelBuilder = require("../builders/PanelBuilder");
const EmpleadosPanelRepository = require("./EmpleadosPanelRepository");
const TurnoService = require("./TurnoService");

class EmpleadosPanelService {

    static async crear(interaction) {

        if (EmpleadosPanelRepository.existe()) {

            return interaction.reply({

                content: "❌ Ya existe un panel de empleados.",

                ephemeral: true

            });

        }

        const mensaje = await interaction.channel.send({

            embeds: [

               empleadosPanelEmbed(

    PanelBuilder.generar(

        TurnoService.obtenerTurnosActivos()

    )

)

            ]

        });

        EmpleadosPanelRepository.registrar(

            interaction.channel.id,

            mensaje.id

        );

        await interaction.reply({

            content: "✅ Panel creado correctamente.",

            ephemeral: true

        });

    }

    static async actualizar(client) {

    try {

        console.log("Actualizando panel");

        if (!EmpleadosPanelRepository.existe()) {
            console.log("No existe panel");
            return;
        }

        const datos = EmpleadosPanelRepository.obtener();

        console.log(datos);

        const canal = await client.channels.fetch(datos.channelId);

        if (!canal) {
            console.log("Canal no encontrado");
            return;
        }

        const mensaje = await canal.messages.fetch(datos.messageId);

        if (!mensaje) {
            console.log("Mensaje no encontrado");
            return;
        }

        console.log("Turnos:", TurnoService.listar());

        await mensaje.edit({
            embeds: [
                empleadosPanelEmbed(
                    PanelBuilder.generar(
                        TurnoService.obtenerTurnosActivos()
                    )
                )
            ]
        });

        console.log("Panel actualizado");

    } catch (err) {

        console.error(err);

    }

}

}

module.exports = EmpleadosPanelService;