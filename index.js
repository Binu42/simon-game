var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var clickedButtonUser = [];
var level = 0;
var started = false;

$(document).on('keypress', function () {
    if (!started) {
        started = true;
        nextSequence();
    }
});

$('h1').click(".startBtn", function () {
    if (!started) {
        started = true;
        nextSequence();
    }
});

$('.btn').on('click', function () {
    var choosenColor = $(this).attr('id')
    clickedButtonUser.push(choosenColor);
    animateButton(choosenColor);
    playSound(choosenColor);
    checkCorrectness(clickedButtonUser.length - 1);
});

function nextSequence() {
    $('h1').text('Level ' + (level + 1));
    clickedButtonUser = [];
    level++;
    var random = Math.floor(Math.random() * 4);
    var randomColor = buttonColors[random];
    gamePattern.push(randomColor);
    $('#' + randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}

function playSound(randomColor) {
    var audio = new Audio('sounds/' + randomColor + '.mp3');
    audio.play();
}

function animateButton(choosenColor) {
    $('#' + choosenColor).addClass('pressed');
    setTimeout(function () {
        $('#' + choosenColor).removeClass('pressed');
    }, 300);
}

function checkCorrectness(current) {
    if (gamePattern[current] === clickedButtonUser[current]) {
        if (clickedButtonUser.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 500);
        }
    } else {
        playSound("wrong");
        $('body').addClass('game-over');
        $('h1').text("Game over, Press Any key to Start Again ...");
        $('h1').append('<button class="startBtn">Start</button>');
        setTimeout(function () {
            $('body').removeClass('game-over');
        }, 200);
        startover();
    }
}

function startover() {
    gamePattern = [];
    started = false;
    clickedButtonUser = [];
    level = 0;
}