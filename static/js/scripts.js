// scripts.js
$(document).ready(function() {
    // 默认启用夜间模式
    $('body').addClass('dark-mode');
    const darkModeStyle = document.getElementById('dark-mode-style');
    darkModeStyle.disabled = false;

    $('#huyaForm').on('submit', function(event) {
        event.preventDefault();
        const roomId = $('#huya_room_id').val();
        $.post('/get_flv', { room_id: roomId }, function(data) {
            $('#huyaList').empty();
            if (data.error) {
                alert(data.error);
                return;
            }
            data.forEach(function(url) {
                addListItem(url, '#huyaList');
            });
            playFlv(data[0]);
        });
    });

    $('#douyinForm').on('submit', function(event) {
        event.preventDefault();
        const roomUrl = $('#douyin_room_url').val();
        $.post('/get_douyin', { room_url: roomUrl }, function(data) {
            $('#douyinList').empty();
            if (data.error) {
                alert(data.error);
                return;
            }
            for (let key in data) {
                addListItem(data[key], '#douyinList', key);
            }
            playFlv(data['origin']);
        });
    });

    $('#customUrlForm').on('submit', function(event) {
        event.preventDefault();
        const customUrl = $('#custom_url').val();
        playFlv(customUrl);
    });

    function addListItem(url, listSelector, label = '') {
        const listItem = $('<li>').text(label ? `${label}: ${url}` : url);
        const playButton = $('<button>').text('播放').on('click', function() {
            playFlv(url);
        });
        const copyButton = $('<button>').text('复制').on('click', function() {
            copyToClipboard(url);
        });
        listItem.append(playButton).append(copyButton);
        $(listSelector).append(listItem);
    }

    function playFlv(url) {
        if (flvjs.isSupported()) {
            const videoElement = document.getElementById('videoPlayer');
            if (videoElement.flvPlayer) {
                videoElement.flvPlayer.unload();
                videoElement.flvPlayer.detachMediaElement();
            }
            // 动态适应协议
            const protocol = window.location.protocol;
            const fullUrl = url.startsWith('http') ? url : `${protocol}//${url}`;
            videoElement.flvPlayer = flvjs.createPlayer({
                type: 'flv',
                url: fullUrl
            });
            videoElement.flvPlayer.attachMediaElement(videoElement);
            videoElement.flvPlayer.load();
            videoElement.flvPlayer.play();
        }
    }

    function copyToClipboard(text) {
        const tempInput = document.createElement('input');
        tempInput.style.position = 'fixed'; // Prevent scrolling
        tempInput.style.opacity = '0'; // Hide the input
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        alert('链接已复制: ' + text);
    }

    // 夜间模式切换
    $('.toggle-dark-mode').on('click', function() {
        $('body').toggleClass('dark-mode');
        const darkModeStyle = document.getElementById('dark-mode-style');
        darkModeStyle.disabled = !darkModeStyle.disabled;
    });
});
