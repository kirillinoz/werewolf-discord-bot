const config = {
    options: {
        token: "token",
        prefix: "wvd."
    },
    error: {
        noPermission: "You don't have permission to use this command!",
        match_1: "You need to mention the role, role messaging state (true/false) and can the role be shown in the channel (true/false)!",
        match_2: "The second argument must be a boolean (true/false)!",
        match_3: "The third argument must be a boolean (true/false)!",
        couple_1: "One of the arguments is missing! (channel player player)",
        couple_2: "The player IDs you mentioned don't have a role in the game!",
        couple_3: "The channel ID you mentioned doesn't exist on your server!",
        assign_1: "You need to mention the roles, you want to play with!",
        assign_2: "You must be in a voice channel to use this command!",
        assign_3: "The role **",
        assign_4: "** has yet no channel assigned!",
        assign_5: "Less roles than members (not counting you) in the voice chat!",
        assign_6: "More roles than members (not counting you) in the voice chat!"
    },
    flip: {
        heads: "Kopf",
        tails: "Zahl"
    },
    match: {
        assignement: "This Channel is assigned to **",
        messaging: "**, messaging state: **",
        visibility: "**, visual state: **",
        end: "**"
    },
    reset: {
        permissions: "All permissions have been reseted!",
        setup: "The channel setup was deleted!"
    },
    couple: {
        player_1: "**",
        player_2: "** and **",
        end: "** are now paired!",
        notification: "ihr seid jetzt ein Pärchen! Ihr müsst euch gegenseitig beschützen!"
    },
    assign: {
        name: "Name: ",
        id: ", ID: ",
        role: ", Rolle: ",
        embed: {
            title: "WVD: Neue Runde!",
            thumbnail: "https://cdn.discordapp.com/app-icons/698810510665056338/ddc2d2eb03a0c659a3bd59d78f3d8c5c.png?size=256",
            author: "WVD Helper",
            field_1: "Rolle:",
            field_2: "Spieler mit dieser Rolle:"
        }
    }
}

module.exports = {config};
