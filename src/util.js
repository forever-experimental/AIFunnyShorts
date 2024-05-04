var $ = (selector) =>
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
var CuteModal = {
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