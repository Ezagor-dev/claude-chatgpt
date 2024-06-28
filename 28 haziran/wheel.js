const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const slices = 6;
const sliceAngle = 2 * Math.PI / slices;
const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A8', '#A833FF', '#FF8333'];
const prizes = ['100', '200', '300', '400', '500', '600'];
let currentAngle = 0;
let spinning = false;

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < slices; i++) {
        // Draw slice
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, currentAngle + i * sliceAngle, currentAngle + (i + 1) * sliceAngle);
        ctx.fillStyle = colors[i];
        ctx.fill();
        ctx.closePath();

        // Draw text
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(currentAngle + i * sliceAngle + sliceAngle / 2);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 20px Arial';
        ctx.fillText(prizes[i], canvas.width / 4, 10);
        ctx.restore();
    }
}

function spin() {
    if (spinning) return;
    spinning = true;
    const spinAngle = Math.random() * 10 + 10; // Random spin between 10 and 20 turns
    const duration = 5000; // Spin duration in ms
    const startTime = performance.now();

    function animate(time) {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutProgress = easeOut(progress); // Easing function for smooth stop
        currentAngle = easeOutProgress * spinAngle * Math.PI * 2;
        drawWheel();
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            spinning = false;
            const winningIndex = Math.floor((slices - ((currentAngle + Math.PI / 2) % (2 * Math.PI)) / sliceAngle) % slices);
            setTimeout(() => alert(`Congratulations! You won ${prizes[winningIndex]}`), 100);
        }
    }
    requestAnimationFrame(animate);
}

function easeOut(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

drawWheel();
