module.exports = {

    name:'warn',

    description: 'warn',

    execute(message, args) {

        const discord = require("discord.js");

        let warnUser = message.guild.member(
            message.mentions.users.first() || message.guild.members.get(args[0])
        );
        if(!warnUser) {
            return message.channel.send("L'utilisateur n'existe pas");
        }
        let warnReason = args.join(' ').slice(22);
        if(!message.member.hasPermission('ADMINISTRATOR')){
            return message.channel.send("Vous n'avez pas les permissions pour warn")

        }
        if (warnUser.hasPermission('ADMINISTRATOR')){
            return message.channel.send('Vous ne pouvez pas warn cette personne')
        }

        let warnEmbed = new discord.MessageEmbed()
            .setTitle("Ban")
            .setColor('#DA2801')
            .addField('Utilisateur warn', `${warnUser} (ID: ${warnUser.id})`)
	        .addField(
                'Utilisateur qui a warn',
                `${message.author} (ID: ${message.author.id})`
            )
            .addField('Channel',message.channel)
            .addField('Raison', warnReason)
            
        message.delete();

        let logsChannel = message.guild.channels.cache.find(c => c.name === "〖💾〗les-logs");

        logsChannel.send(warnEmbed);
    }
}