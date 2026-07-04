const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const GROUP_NAME = "اذكار";

const messages = [

`🌿 ═════ ❀ ═════ 🌿

🤍 صلِّ على النبي ﷺ

اللهم صلِّ وسلم وبارك على نبينا محمد
وعلى آله وصحبه أجمعين.

✨ قال ﷺ:
"من صلى عليَّ صلاةً صلى الله عليه بها عشرًا."

🌹 أكثروا من الصلاة عليه ﷺ.

🌿 ═════ ❀ ═════ 🌿`,

`🤲 ═════ ❀ ═════ 🤲

استغفر الله العظيم
الذي لا إله إلا هو
الحي القيوم وأتوب إليه.

💚 أكثروا من الاستغفار،
فإن فيه راحةً للقلوب
ومغفرةً للذنوب.

🤲 ═════ ❀ ═════ 🤲`,

`📿 ═════ ❀ ═════ 📿

سبحان الله 🌸
الحمد لله 🌼
لا إله إلا الله 🤍
الله أكبر ✨

💎 أحبُّ الكلام إلى الله.

📿 ═════ ❀ ═════ 📿`,

`🌸 ═════ ❀ ═════ 🌸

لا حول ولا قوة إلا بالله.

🌿 كنزٌ من كنوز الجنة.

🌸 ═════ ❀ ═════ 🌸`,

`🌺 ═════ ❀ ═════ 🌺

﴿ ألا بذكر الله تطمئن القلوب ﴾

💚 اجعل لسانك رطبًا بذكر الله.

🌺 ═════ ❀ ═════ 🌺`,

`💚 ═════ ❀ ═════ 💚

اللهم اغفر للمؤمنين والمؤمنات
الأحياء منهم والأموات.

🤲 نسأل الله القبول لنا ولكم.

💚 ═════ ❀ ═════ 💚`

];

let lastIndex = -1;

const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
    console.clear();
    console.log("📱 امسح هذا الـ QR من واتساب:");
    qrcode.generate(qr, { small: true });
});

client.on("ready", async () => {

    console.log("✅ البوت متصل بواتساب!");

    try {

        const chats = await client.getChats();

        const group = chats.find(
            chat => chat.isGroup && chat.name === GROUP_NAME
        );

        if (!group) {
            console.log("❌ لم يتم العثور على الجروب.");
            return;
        }

        console.log("✅ تم العثور على الجروب.");

        await group.sendMessage("🤖 تم تشغيل بوت الأذكار بنجاح.\n\n🌿 سيبدأ بإرسال الأذكار كل 5 دقائق بإذن الله.");

        setInterval(async () => {

            let randomIndex;

            do {
                randomIndex = Math.floor(Math.random() * messages.length);
            } while (randomIndex === lastIndex);

            lastIndex = randomIndex;

            await group.sendMessage(messages[randomIndex]);

        }, 5 * 60 * 1000);

    } catch (err) {
        console.log(err);
    }

});

client.initialize();