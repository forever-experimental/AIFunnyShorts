$('#button-video').onclick = () => {
    CuteModal.show('Video generation in progress...');
    const audioElement = document.getElementById('audio');
    const audioSrc = audioElement.src;

    fetch(audioSrc)
        .then(response => response.blob())
        .then(blob => {
            const formData = new FormData();
            formData.append('file', blob, 'upload.mp3');

            return fetch('http://localhost:6969/upload-audio', {
                method: 'POST',
                body: formData
            });
        })
        .then(response => response.json())
        .then(data => {
            console.log('File uploaded successfully', data)
        })
        .catch(error => {
            console.error('Upload failed', error)
        }).finally(() => CuteModal.hide());
}