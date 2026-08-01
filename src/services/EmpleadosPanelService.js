const empleadosPanelEmbed = require("../embeds/empleadosPanelEmbed");
const PanelBuilder = require("../builders/PanelBuilder");
const EmpleadosPanelRepository = require("./EmpleadosPanelRepository");
const TurnoService = require("./TurnoService");

class EmpleadosPanelService {

static async crear(interaction) {

    if (EmpleadosPanelRepository.existe()) {

        return interaction.reply({

            content: "❌ Ya existe un panel.",

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

        if (!EmpleadosPanelRepository.existe()) return;

        const datos = EmpleadosPanelRepository.obtener();

        const canal = await client.channels.fetch(datos.channelId);

        if (!canal) return;

        let mensaje;

        try {

            mensaje = await canal.messages.fetch(datos.messageId);

        } catch (err) {

            // El panel fue eliminado
            if (err.code === 10008) {

                console.log("⚠ Panel eliminado. Creando uno nuevo...");

                const nuevoMensaje = await canal.send({

                    embeds: [

                        empleadosPanelEmbed(

                            PanelBuilder.generar(
                                TurnoService.obtenerTurnosActivos()
                            )

                        )

                    ]

                });

                EmpleadosPanelRepository.registrar(

                    canal.id,
                    nuevoMensaje.id

                );

                console.log("✅ Panel recreado");

                return;

            }

            throw err;

        }

        await mensaje.edit({

            embeds: [

                empleadosPanelEmbed(

                    PanelBuilder.generar(
                        TurnoService.obtenerTurnosActivos()
                    )

                )

            ]

        });

    } catch (err) {

        console.error(err);

    }

}

}

module.exports = EmpleadosPanelService;