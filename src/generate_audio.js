// https://elevenlabs.io/docs/api-reference/text-to-speech
$('#button-speech').onclick = () => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'xi-api-key': $('#input-elvnlabs').value
        },
        body: JSON.stringify({
            text: $('#textarea-tts').value,
            model_id: 'eleven_multilingual_v1', // https://help.elevenlabs.io/hc/en-us/articles/21811236079505-How-do-I-find-the-model-ID
            voice_settings: {
                stability: 0.3,
                similarity_boost: 0.0,
                style: 0.0,
                use_speaker_boost: true
            }
        })
    };
    CuteModal.show('Audio generation in progress...');
    try {
        $('#audio').src = '';
        fetch('https://api.elevenlabs.io/v1/text-to-speech/jsCqWAovK2LkecY7zXl4', options) // https://api.elevenlabs.io/v1/voices
            .then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                $('#audio').src = url;
                $('#audio').load();
            })
            .catch(err => console.error(err));
    } catch (err) {
        console.error(err);
    }
    console.log('done...');
    CuteModal.hide();
}