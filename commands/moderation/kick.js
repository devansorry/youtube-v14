const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
       .setName('kick')
       .setDescription('Kick a user from this server.')
       .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
       .addUserOption(option =>
            option.setName('target')
            .setDescription('User to kick')
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
            .setDescription('Reason to kick')    
        ),
        async execute(interaction) {
            const { channel, options } = interaction;

            const user = options.getUser('target');
            const reason = options.getString('reason');

            const member = await interaction.guild.members.fetch(user.id)

            const errEmbed = new EmbedBuilder()
            .setDescription(`You can't take action on ${user.username} since they have a higher role than you.`)
            .setColor("Red")

            if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({
                embeds: [errEmbed],
                ephemeral: true
            });

            await member.kick(reason);

            const embed = new EmbedBuilder()
            .setDescription(`Successfully kicked ${user}\nReason: **${reason}**`);

            await interaction.reply({
                embeds: [embed]
            });
        }
}
