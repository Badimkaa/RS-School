const piano = document.querySelector('.piano');
const collection = document.querySelectorAll('.piano-key');
let checkClick = false;
function playAudioKeyboard(event) {
    const audio = document.querySelector(`audio[data-letter=${event.code}]`);
    if (event.repeat) {
        return false;
    }
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    let key = document.querySelector(`.piano-key[data-letter=${event.code[3]}]`);
    key.classList.add('piano-key-active');
}
function stopActive(event) {
    let key = document.querySelector(`.piano-key[data-letter=${event.code[3]}]`);
    if (!key) return;
    key.classList.remove('piano-key-active');
}
function startSound(event) {
    if (checkClick) playmusic(event)
}
function playmusic(event) {
    if (event.target.classList.contains('piano-key') && event.which === 1) {
        event.target.classList.add('piano-key-active');
        event.target.classList.add('piano-key-active-pseudo');
        const mouseAudio = new Audio();
        mouseAudio.src = `assets/audio/${event.target.dataset.note}.mp3`;
        mouseAudio.currentTime = 0;
        mouseAudio.play();
    }
}
function stopSound(event) {
    event.target.classList.remove('piano-key-active');
    event.target.classList.remove('piano-key-active-pseudo');
}
function startAudio(event) {
    checkClick = true;
    playmusic(event)
    collection.forEach((elem) => {
        elem.addEventListener("mouseover", startSound);
        elem.addEventListener("mouseout", stopSound);
    })
}
function stopAudio(event) {
    checkClick = false;
    event.target.classList.remove('piano-key-active');
    event.target.classList.remove('piano-key-active-pseudo');

    collection.forEach((elem) => {
        elem.removeEventListener("mouseover", startSound);
        elem.removeEventListener("mouseout", stopSound);
    })

}

piano.addEventListener('mousedown', startAudio);
window.addEventListener('mouseup', () => {
    checkClick = false;
});
piano.addEventListener('mouseup', stopAudio);
window.addEventListener('keydown', playAudioKeyboard);
window.addEventListener('keyup', stopActive);

var buttons = document.querySelectorAll(".btn");

for (var button of buttons) {
    button.addEventListener('click', function (event) {
        if (!event.target.classList.contains('btn-active')) {
            buttons.forEach(i => i.classList.remove('btn-active'));
            event.target.classList.add('btn-active');

            collection.forEach((elem) => {
                elem.classList.toggle('piano-key-letter');
            })
        }
    });
};
document.addEventListener('click', function (event) {
    if (!event.target.classList.contains('fullscreen')) return;
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
}, false);