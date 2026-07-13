const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

module.exports = {

    name: "panelturnos",

    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setColor("#2ECC71")
            .setTitle("📋 Registro de Turnos")
            .setDescription(
`Bienvenido al sistema de registro.

Presiona el botón correspondiente para iniciar o finalizar tu turno.`
            );

        const botones = new ActionRowBuilder()
            .addComponents(

                new ButtonBuilder()
                    .setCustomId("entrar")
                    .setLabel("Entrar en servicio")
                    .setEmoji("🟢")
                    .setStyle(ButtonStyle.Success),

                new ButtonBuilder()
                    .setCustomId("salir")
                    .setLabel("Salir de servicio")
                    .setEmoji("🔴")
                    .setStyle(ButtonStyle.Danger)

            );

        await interaction.reply({

            embeds: [embed],
            components: [botones]

        });

    }

};