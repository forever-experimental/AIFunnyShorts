const $ = (selector) =>
{
    const el = document.querySelector(selector);
    if (!el) throw new Error(`Element not found: ${selector}`);
    el.render = (html) =>
    {
        if (typeof html === 'function') html = html();
        if (typeof html === 'string') el.innerHTML = html;
        else if (html instanceof HTMLElement) {
            el.innerHTML = '';
            el.appendChild(html.cloneNode(true));
        }
    };
    el.pierce = (html) =>
    {
        if (typeof html === 'function') html = html();
        if (typeof html === 'string') el.insertAdjacentHTML('afterbegin', html);
        else if (html instanceof HTMLElement) el.prepend(html.cloneNode(true));
    };
    el.inject = (html) =>
    {
        if (typeof html === 'function') html = html();
        if (typeof html === 'string') el.insertAdjacentHTML('beforeend', html);
        else if (html instanceof HTMLElement) el.appendChild(html.cloneNode(true));
    };
    return el;
};

$('#gen-script').onclick = async () => {
    CuteModal.show('Script generation in progress...');
    const response = await chat($('#apikey').value, $('#story').value, 0.7, 1.0)
    console.log(response);
    $('#script').textContent = response;
    CuteModal.hide();
}

async function chat(apiKey, messageContent, temperature, topP, model = 'gpt-4-turbo-2024-04-09') {
    const payload = {
        model: model, messages: [{
            role: "user", content: messageContent
        }], temperature: temperature, top_p: topP
    };
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: 'POST', headers: {
            'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}`
        }, body: JSON.stringify(payload)
    });
    return (await response.json()).choices[0].message.content;
}


const CuteModal = {
    modal: (msg) => `
        <div id="cute-modal"
             style="position:fixed; left:0; top:0; width:100%; height:100%; background:rgba(0,0,0,0.5);">
            <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); padding:20px; background:#fff;">
                ${msg}
            </div>
        </div>
    `,
    show: (msg = 'Loading...') => $('body').inject(CuteModal.modal(msg)),
    hide: () => $('#cute-modal').remove()
};