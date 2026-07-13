
require("dotenv").config();

const fs = require("fs");
const path = require("path");

const {
    Client,
    GatewayIntentBits,
    Collection,
    Events
} = require("discord.js");

const client = new Client({

    intents: [
        GatewayIntentBits.Guilds
    ]

});

client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");

const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {

    const command = require(path.join(commandsPath, file));

    client.commands.set(command.name, command);

}

const ready = require("./events/ready");

client.once(Events.ClientReady, () => {

    ready(client);

});
const interactionCreate = require("./events/interactionCreate");

client.on(Events.InteractionCreate, interaction => {

    interactionCreate(interaction, client);

});
client.login(process.env.TOKEN);