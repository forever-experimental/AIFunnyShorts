const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
        // 'xi-api-key': 'YOUR_API_KEY'
    },
    body: JSON.stringify({
        text: $('#script').value,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
            stability: 0.3,
            similarity_boost: 0.5,
            style: 0,
            use_speaker_boost: true
        }
    })
};


$('#gen-audio').onclick = () => {
    fetch('https://api.elevenlabs.io/v1/text-to-speech/XB0fDUnXU5powFXDhCwa', options)
        .then(response => response.blob()) // Get the response as a blob
        .then(blob => {
            const url = URL.createObjectURL(blob);
            const audio = document.getElementById('audio');
            audio.src = url;
            audio.load(); // Load the audio source into the <audio> element
        })
        .catch(err => console.error(err));
}



