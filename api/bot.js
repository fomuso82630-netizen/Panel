export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(200).send('Bot ishlayapti');
    }

    const TELEGRAM_TOKEN = '8924868649:AAEuu6VDrrCF3AJJUUFP7ngqWTYI5egh-5Y';
    const ADMIN_CHAT_ID = '1024474543';

    try {
        const body = req.body;
        if (!body || !body.message) {
            return res.status(200).json({ ok: true });
        }

        const chatId = body.message.chat.id;
        const text = body.message.text;

        if (text === '/start') {
            await fetch(https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: "Assalomu alaykum! Moshina va uy eshiklarini ochish xizmatiga xush kelibsiz.\n\nBuyurtma berish uchun pastdagi tugmalar orqali raqamingiz va lokatsiyangizni yuboring:",
                    reply_markup: {
                        keyboard: [
                            [{ text: "📱 Telefon raqamni yuborish", request_contact: true }],
                            [{ text: "📍 Lokatsiyani yuborish", request_location: true }]
                        ],
                        resize_keyboard: true
                    }
                })
            });
        }

        if (body.message.contact || body.message.location) {
            let msgText = 🚨 **Yangi buyurtma!**\n👤 Mijoz: ${body.message.from?.first_name || 'Noma\'lum'}\n;
            
            if (body.message.contact) {
                msgText += 📞 Tel: +${body.message.contact.phone_number}\n;
            }
            if (body.message.location) {
                const lat = body.message.location.latitude;
                const lon = body.message.location.longitude;
                msgText += 📍 Lokatsiya: https://maps.google.com/?q=${lat},${lon}\n;
            }

            await fetch(https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: ADMIN_CHAT_ID,
                    text: msgText,
                    parse_mode: 'Markdown'
                })
            });
        }

        return res.status(200).json({ ok: true });
    } catch (error) {
        return res.status(200).json({ ok: true });
    }
}
