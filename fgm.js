var wamaster = require("@open-wa/wa-automate");

var cmdhelp = "「 FGM Whatsapp Bot 」\n\
Type: Help\n\
➣ Profile\n\
➣ Group\n\
➣ Broadcast\n\
➣ Tagall\n\
➣ CheckReader\n\
➣ Speed\n\
➣ Runtime\n\
➣ Restart\n\
➣ Logout\n\
\n\
⌬ FGM Whatsapp Beta\n\
Ⓒ FGM Creation 2020\
"

var cmdabout = "「 About FGM Whatsapp Bot 」\n\
Name: FGM Whatsapp Bot\n\
Version: Beta Version\n\
Type: Public Bot\n\
\n\
Created With Love By \n\
Hansen & Firman\n\
\n\
「 Special Thanks 」\n\
>> FGM Corporation\n\
>> FGM LINE\n\
>> FGM Telegram\n\
>> FGM Reviewer\n\
>> FGM Protect\n\
>> FGM SelfBot\n\
>> FGM Indonesia\n\
>> FGM Malaysia\n\
>> FGM International\n\
>> BE TEAM\n\
>> PT MegaCorp InterBuana\n\
>> and All FGM Lovers..\
"

wamaster.create({
    qrRefreshS:15,
	executablePath: "chrome-win/chrome.exe",
	headless: true,
	autoRefresh: true,
	killTimer: 100
}).then(async client => {
	await process.stdin.resume();
	await process.on('exit', ()=>{
		client.kill();
	});
	await process.on('SIGINT', ()=>{
		client.kill();
	});
	await process.on('uncaughtException', ()=>{
		client.kill();
	});
	
	await start(client);
});


function start(client){
	client.onMessage(async message => {
		switch(message.body) {
			case "help":
			await client.sendText(message.from, cmdhelp);
			break;

			case "about":
			await client.sendText(message.from, cmdabout);
			break;

			case "halo":
			await client.sendText(message.from, "Halo Juga!!!");
			break;

		}

		if(message.body == "tagall"){
            if(message.chat.isGroup == true){
                var wa_member = await client.getGroupMembersId(message.chat.id)
                console.log(message.chat.id)
                var pesan = "「 Tag All Group Member 」"
                for(let i=0; i<wa_member.length; i++){
                    angka = i + 1
                    pesan += "\n" + angka.toString() + ". @" + wa_member[i].split("@")[0]
                }
                await client.sendTextWithMentions(message.from, pesan)
            } else {
                await client.sendText(message.from, "I'm Sorry, You Can't Use This Command on Personal chat.")
            }
		
	}});
}


