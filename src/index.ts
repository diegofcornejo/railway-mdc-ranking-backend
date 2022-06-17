import 'dotenv/config'
import express from 'express';

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(express.raw({ type: 'application/vnd.custom-type' }));
app.use(express.text({ type: 'text/html' }));

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILD_MEMBERS] });
client.login(process.env.DISCORD_TOKEN);

app.get('/', async (_req, res) => {
  type Member = {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
  }
	console.log(`Logged in as ${client.user.tag}!`);
	const guild = client.guilds.cache.get('723594962851332197');
	const _members = await guild.members.fetch();
	let members: Member[] = [];
	_members.map(async (member: any) => {
		// console.log(member.user.username)
		let obj: Member = {
			id: member.user.id,
			username: member.user.username,
			discriminator: member.user.discriminator,
			avatar: `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png`,
			// ...payload
		};
		members.push(obj);
	});
	res.send(members);
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
