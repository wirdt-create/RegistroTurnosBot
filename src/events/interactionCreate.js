const entrar = require("../buttons/entrar");
const salir = require("../buttons/salir");

module.exports = async (interaction, client) => {

    // ===========================
    // COMANDOS
    // ===========================

    if (interaction.isChatInputCommand()) {

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {

            await command.execute(interaction);

        } catch (error) {

            console.error(error);

            if (interaction.replied || interaction.deferred) {

                await interaction.followUp({
                    content: "❌ Ocurrió un error.",
                    ephemeral: true
                });

            } else {

                await interaction.reply({
                    content: "❌ Ocurrió un error.",
                    ephemeral: true
                });

            }

        }

        return;
    }

    // ===========================
    // BOTONES
    // ===========================

    if (interaction.isButton()) {

        if (interaction.customId === "entrar") {

            return entrar(interaction);

        }

        if (interaction.customId === "salir") {

            return salir(interaction);

        }

    }

};