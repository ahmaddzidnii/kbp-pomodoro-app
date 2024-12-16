export class Countdown {
  constructor(durationMinutes, onTick, onComplete) {
    this.duration = durationMinutes * 60; // Konversi menit ke detik
    this.onTick = onTick; // Callback untuk setiap detik
    this.onComplete = onComplete; // Callback ketika countdown selesai
    this.remainingTime = this.duration;
    this.interval = null;
  }

  start() {
    if (this.interval) return; // Hindari memulai ulang jika sudah berjalan
    this.interval = setInterval(() => {
      this.remainingTime--;

      if (this.onTick) {
        this.onTick(this.formatTime(this.remainingTime));
      }

      if (this.remainingTime <= 0) {
        this.stop();
        if (this.onComplete) {
          this.onComplete();
        }
      }
    }, 1000);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  reset(durationMinutes) {
    this.stop();
    this.remainingTime = durationMinutes * 60;
  }

  formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  }
}

// Contoh penggunaan
// const countdown = new Countdown(
//   1, // Durasi dalam menit
//   (time) => console.log(`Time left: ${time}`), // Callback untuk setiap detik
//   () => console.log("Countdown completed!") // Callback ketika selesai
// );

// countdown.start();

// Anda bisa memanggil metode lain seperti `countdown.stop()` atau `countdown.reset(2)` sesuai kebutuhan.
