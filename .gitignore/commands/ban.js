module.exports = {

    name:'ban',

    description: 'ban',

    execute(message, args) {

        const discord = require("discord.js");

        let bannedUser = message.guild.member(
            message.mentions.users.first() || message.guild.members.get(args[0])
        );
        if(!bannedUser) {
            return message.channel.send("L'utilisateur n'existe pas");
        }
        let banReason = args.join(' ').slice(22);
        if(!message.member.hasPermission(['ADMINISTRATOR', 'BAN_MEMBERS'])){
            return message.channel.send("Vous n'avez pas les permissions pour ban")

        }
        if (bannedUser.hasPermission(['ADMINISTRATOR', 'BAN_MEMBERS'])){
            return message.channel.send('Vous ne pouvez pas ban cette personne')
        }

        let banEmbed = new discord.MessageEmbed()
            .setTitle("Ban")
            .setColor('#DA2801')
            .addField('Utilisateur ban', `${bannedUser} (ID: ${bannedUser.id})`)
	        .addField(
                'Utilisateur qui a ban',
                `${message.author} (ID: ${message.author.id})`
            )
            .addField('Channel',message.channel)
            .addField('Raison', banReason)
            
        message.delete();

        let logsChannel = message.guild.channels.cache.find(c => c.name === "〖💾〗les-logs");

        message.guild.member(bannedUser).ban();
        logsChannel.send(banEmbed);
    }
}