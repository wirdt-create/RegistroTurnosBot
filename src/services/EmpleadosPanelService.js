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

        if (!EmpleadosPanelRepository.existe()) return;

        const datos = EmpleadosPanelRepository.obtener();

        const canal = await client.channels.fetch(datos.channelId);

        if (!canal) return;

        const mensaje = await canal.messages.fetch(datos.messageId);

        if (!mensaje) return;

        await mensaje.edit({

            embeds: [

                empleadosPanelEmbed(

    PanelBuilder.generar(

        TurnoService.obtenerTurnosActivos()

    )

)

            ]

        });

    }

}

module.exports = EmpleadosPanelService;