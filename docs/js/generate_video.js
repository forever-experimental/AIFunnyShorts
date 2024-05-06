$('#button-video').onclick = () => {
    CuteModal.show('Video generation in progress...');
    const audioElement = document.getElementById('audio');
    const audioSrc = audioElement.src;

    fetch(audioSrc)
        .then(response => response.blob())
        .then(blob => {
            const formData = new FormData();
            formData.append('file', blob, 'upload.mp3');

            return fetch('http://localhost:6969/edit', {
                method: 'POST',
                body: formData
            });
        })
        .then(response => response.json())
        .then(data => {
            if (data.filePath) {
                console.log('File path returned from server', data.filePath);
                //$('#video').src = data.filePath;
                $('#video').src = 'video.mp4';
                $('#video').load();
                console.log('File uploaded successfully', data);
            } else {
                throw new Error('No file path returned from server');
            }
        })
        .catch(error => {
            console.error('Upload failed', error)
        }).finally(() => CuteModal.hide());
}