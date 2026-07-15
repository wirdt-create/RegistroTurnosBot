const TurnoService = require("../services/TurnoService");
const finEmbed = require("../embeds/finEmbed");
const calcularTiempo = require("../utils/tiempo");
const EmpleadosPanelService = require("../services/EmpleadosPanelService");

module.exports = async (interaction) => {

    const resultado = TurnoService.salir(interaction);

    if (!resultado.ok) {

        return interaction.reply({

            content: resultado.mensaje,

            ephemeral: true

        });

    }

    const tiempo = calcularTiempo(resultado.inicio, resultado.fin);

    const canal = interaction.guild.channels.cache.get(
        process.env.REGISTRO_CHANNEL_ID
    );

    if (canal) {

        await canal.send({

            embeds: [

                finEmbed(

                    interaction.user,

                    resultado.inicio,

                    resultado.fin,

                    tiempo

                )

            ]

        });

    }
    
   // await EmpleadosPanelService.actualizar(interaction.client);
    await interaction.reply({

        embeds: [

            {

                color: 0xE74C3C,

                title: "🔴 Has finalizado tu turno",

                fields: [

                    {

                        name: "⏱ Tiempo trabajado",

                        value: tiempo

                    }

                ],

                timestamp: resultado.fin

            }

        ],

        ephemeral: true

    });

};
