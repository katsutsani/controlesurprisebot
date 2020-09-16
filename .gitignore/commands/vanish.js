module.exports = {

    name:'vanish',

    description: 'commande pour vanish',

    execute(message, args) {
        async function purge(){
            message.delete();
            if(isNaN(args[0])){
                message.channel.send('Veuillez entrer le nombre de message a supprimer')
                return;
            }

            if(!message.member.hasPermission(['ADMINISTRATOR', 'BAN_MEMBERS'])){
                return message.channel.send("Vous n'avez pas les permissions pour kick")
    
            }
            if (kickedUser.hasPermission(['ADMINISTRATOR', 'BAN_MEMBERS'])){
                return message.channel.send('Vous ne pouvez pas kick cette personne')
            }

            else{
                const nbsuppr = parseInt(args[0]);
                console.log(nbsuppr + 'message found, deleting . . .');
                message.channel.bulkDelete(nbsuppr);
            }
        }
        purge();
    }
}