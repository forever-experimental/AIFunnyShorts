$('#button-speech').onclick = () => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'xi-api-key': $('#input-elvnlabs').value
        },
        body: JSON.stringify({
            text: $('#textarea-tts').value,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
                stability: 0.3,
                similarity_boost: 0.5,
                style: 0,
                use_speaker_boost: true
            }
        })
    };
    CuteModal.show('Audio generation in progress...');
    try {
        // Clear the existing audio source if any
        const audio = $('#audio');
        audio.src = '';

        fetch('https://api.elevenlabs.io/v1/text-to-speech/XB0fDUnXU5powFXDhCwa', options)
            .then(response => response.blob()) // Get the response as a blob
            .then(blob => {
                const url = URL.createObjectURL(blob);
                audio.src = url;
                audio.load(); // Load the new audio source into the <audio> element
            })
            .catch(err => console.error(err));
    } catch (err) {
        console.error(err);
    }

    console.log('done...');
    CuteModal.hide();
}


