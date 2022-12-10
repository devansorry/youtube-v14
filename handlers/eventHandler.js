function loadEvents(client) {
    const ascii = require('ascii-table');
    const fs = require('fs');
    const table = new ascii().setHeading('Events', 'Status');

    const folders = fs.readdirSync('./events');
    for (const folder of folders) {
        // quick fix (sorry!)
        const files = fs.readdirSync(`./events/${folder}`).filter((file) => file.endsWith('.js'));

        for (const file of files) {
            const event = require(`../events/${folder}/${file}`);

            if (event.rest) {
                if(client.once)
                    client.rest.once(event.name, (...args) =>
                    client.execute(...args, client)
                );
                else
                    client.rest.on(event.name, (...args) =>
                        event.execute(...args, client)
                    );
            } else {
                if (event.once) 
                    client.once(event.name, (...args) => event.execute(...args, client));
                else client.on(event.name, (...args) => event.execute(...args, client))
            }
            table.addRow(file, 'loaded')
            continue;
        }
    }
    return console.log(table.toString(), '\nLoaded events.');
}

//quick fix, sorry!
module.exports = {loadEvents};