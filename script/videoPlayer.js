export const videoPlayerInit = () => {
    console.log('Video Player');

    const videoPlayer = document.querySelector('.video-player');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoProgress = document.querySelector('.video-progress');
    const videoTimeTotal = document.querySelector('.video-time__total');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoVolume = document.querySelector('.video-volume');
    const videoFullscreen = document.querySelector('.video-fullscreen');

    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.add('fa-pause');
            videoButtonPlay.classList.remove('fa-play');
        }
    }

    const togglePlay = () => {

        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    };

    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    }

    //   Функция добавляения нуля перед минутами и секундами в плейере
    const addZero = n => n < 10 ? '0' + n : n;

    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);

    videoPlayer.addEventListener('play', toggleIcon);
    videoPlayer.addEventListener('pause', toggleIcon);

    videoButtonStop.addEventListener('click', stopPlay);

    videoPlayer.addEventListener('timeupdate', () => {
        const curentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;

        videoProgress.value = (curentTime / duration) * 100; // движение прогресс бара, в зависимости от проигрывания видео

        let minutePassed = Math.floor(curentTime / 60);  // выделяем минуты, округляем
        let secondsPassed = Math.floor(curentTime % 60);  // получаем секунды из остатка минут


        let minuteTotal = Math.floor(duration / 60); // выделяем минуты, округляем
        let secondsTotal = Math.floor(duration % 60); // получаем секунды из остатка минут

        //   Добавляем отображение минут и секунд на страницу
        // videoTimePassed.textContent = addZero(minutePassed) + ':' + addZero(secondsPassed); можно переписать на:
        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
        //   videoTimeTotal.textContent = addZero(minuteTotal) + ':' + addZero(secondsTotal); можно переписать на:
        videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;

    });

    videoProgress.addEventListener('change', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100; // присваиваем новое время, куда мы должны переключить
    });

        // Для показа видео на полный экран
        videoFullscreen.addEventListener('click', () => {
            videoPlayer.requestFullscreen();
        });

        // Регулировка громкости
        videoVolume.addEventListener('input', () => {
            videoPlayer.volume = videoVolume.value / 100;
        });

        // Положение громкости при старте на половину
        videoPlayer.volume = 0.5;

        videoVolume.value = videoPlayer.volume * 100;
};