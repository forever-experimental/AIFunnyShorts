// SCRIPT GENERATION!
$('#button-story').onclick = async () => {
    console.log('Generating script...');
    CuteModal.show('Script generation in progress...');
    const response = await chat($('#input-openai').value, $('#textarea-story').value, 0.7, 1.0)
    console.log(response);
    $('#textarea-tts').value = response;
    CuteModal.hide();
}
// API CALL!
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