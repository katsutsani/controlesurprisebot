module.exports = {

    name:'kick',

    description: 'kick',

    execute(message, args) {

        const discord = require("discord.js");

        let kickedUser = message.guild.member(
            message.mentions.users.first() || message.guild.members.get(args[0])
        );
        if(!kickedUser) {
            return message.channel.send("L'utilisateur n'existe pas");
        }
        let kickReason = args.join(' ').slice(22);
        if(!message.member.hasPermission(['ADMINISTRATOR', 'KICK_MEMBERS'])){
            return message.channel.send("Vous n'avez pas les permissions pour kick")

        }
        if (kickedUser.hasPermission(['ADMINISTRATOR', 'KICK_MEMBERS'])){
            return message.channel.send('Vous ne pouvez pas kick cette personne')
        }

        let kickEmbed = new discord.MessageEmbed()
            .setTitle("Kick")
            .setColor('#DA2801')
            .addField('Utilisateur kick', `${kickedUser} (ID: ${kickedUser.id})`)
	        .addField(
                'Utilisateur qui a kick',
                `${message.author} (ID: ${message.author.id})`
            )
            .addField('Channel',message.channel)
            .addField('Raison', kickReason)
            
        message.delete();

        let logsChannel = message.guild.channels.cache.find(c => c.name === "〖💾〗les-logs");

        message.guild.member(kickedUser).kick(kickReason);
        logsChannel.send(kickEmbed);
    }
}