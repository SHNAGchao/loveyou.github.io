let if_music = true;

let textArr = [
    'I love three things in this world,',
    'the sun ,the moon and you.',
    'The sun for the day,',
    'the moon for the night,',
    'and you forever!',
    '',
    'If you were a teardrop,',
    'in my eye,',
    'for fear of losing you,',
    'I would never cry.',
    'And if the golden sun,',
    'should cease to shine its light,',
    'just one smile from you,',
    'would make my whole world bright.'
];

let text_520 = document.getElementById('text_520');
text_520.style.fontSize = 60 + 'px';
$('#text_520').hide();
$('.img').hide();


let m = 0;
let n = 0;
let text = document.getElementById('text');

function typing() {
    if (if_music) {
        $('body').click();
    }
    if (m <= textArr[n].length) {
        text.innerHTML = text.innerHTML.substring(0, text.innerHTML.length - 1) + textArr[n].substr(m++, 1) + '_';
        setTimeout(typing, 250);
    } else {
        if (n < textArr.length - 1) {
            text.innerHTML = text.innerHTML.substring(0, text.innerHTML.length - 1) + "<br />_";
            n++;
            m = 0;
            typing();
        } else {
            text.innerHTML = text.innerHTML.substring(0, text.innerHTML.length - 1);
            $('#text').fadeOut(5000);
            setTimeout(function () {
                $('#text_520').fadeIn(5000);
            }, 7000);
            setTimeout(function () {
                $('#text_520').fadeOut(5000);
            }, 7000);
            setTimeout(function () {
                $('.img').fadeIn(50000);
            }, 15000)
        }
    }
}

setTimeout(typing, 5000);

let ctx = document.querySelector('canvas').getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let sparks = [];
let fireworks = [];

let walker;

fireworks.pop();

let i = 10;
while (i--) fireworks.push(new Firework(Math.random() * window.innerWidth, window.innerHeight * Math.random()));

// setInterval(render, 1000/50);
render();

function render() {

    setTimeout(render, 1000 / 50);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // 上升效果
    for (let firework of fireworks) {
        if (firework.dead) continue;
        firework.move();
        firework.draw();
    }
    // 绽放效果
    for (let spark of sparks) {
        if (spark.dead) continue;
        spark.move();
        spark.draw();

    }

    if (Math.random() < 0.1) fireworks.push(new Firework());
}

function Spark(x, y, color) {
    this.x = x;
    this.y = y;
    this.dir = Math.random() * (Math.PI * 2);
    this.dead = false;
    this.color = color;
    this.speed = Math.random() * 3 + 3;
    walker = new Walker({radius: 20, speed: 0.25});
    this.gravity = 0.25;
    this.dur = this.speed / 0.15;
    this.move = function () {
        this.dur--;
        if (this.dur < 0) this.dead = true;

        if (this.speed < 0) return;
        if (this.speed > 0) this.speed -= 0.15;
        walk = walker.step();
        this.x += Math.cos(this.dir + walk) * this.speed;
        this.y += Math.sin(this.dir + walk) * this.speed;
        this.y += this.gravity;
        this.gravity += 0.05;

    }
    this.draw = function () {
        drawCircle(this.x, this.y, 2, this.color);
    }

}

function Firework(x, y) {
    this.xmove = Math.random() * 2 - 1;
    this.x = x || Math.random() * ctx.canvas.width;
    this.y = y || ctx.canvas.height;
    this.height = Math.random() * ctx.canvas.height / 2;
    this.dead = false;
    this.color = randomColor();

    this.move = function () {
        this.x += this.xmove;
        if (this.y > this.height) this.y -= 4;
        else this.burst();

    }

    this.draw = function () {
        drawCircle(this.x, this.y, 3, this.color)
    }

    this.burst = function () {
        this.dead = true
        i = 100;
        while (i--) sparks.push(new Spark(this.x, this.y, this.color));
        sparks.pop();
    }

}

setTimeout(function () {
    window.open('', '_self').close();
}, 175000);


function drawCircle(x, y, radius, color) {
    color = color || '#FFF';
    ctx.fillStyle = color;
    ctx.fillRect(x - radius / 2, y - radius / 2, radius, radius);
}

function randomColor() {
    return ['#6ae5ab', '#88e3b2', '#36b89b', '#7bd7ec', '#66cbe1'][Math.floor(Math.random() * 5)];
}

function Walker(options) {
    this.step = function () {
        this.direction = Math.sign(this.target) * this.speed
        this.value += this.direction
        this.target
            ? this.target -= this.direction
            : (this.value)
                ? (this.wander)
                    ? this.target = this.newTarget()
                    : this.target = -this.value
                : this.target = this.newTarget()
        return this.direction
    }

    this.newTarget = function () {
        return Math.round(Math.random() * (this.radius * 2) - this.radius)
    }

    this.start = 0
    this.value = 0
    this.radius = options.radius
    this.target = this.newTarget()
    this.direction = Math.sign(this.target)
    this.wander = options.wander
    this.speed = options.speed || 1
}

/*播放音乐*/


const music = $(`<audio loop="loop" src="other/3.mp3"></audio>`).appendTo('body');


$('body').on('click', function () {
    music[0].play();
    if_music = false;
})

