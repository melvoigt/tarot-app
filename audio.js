// Procedurally synthesized ambient sound — no external audio files.
// A gentle C-major pad drifts underneath; each card reveal chimes a
// pentatonic note so the reading feels like it sings.
class Ambience {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.padGain = null;
    this.enabled = false;
    this.padVolume = 0.12;
  }

  init() {
    if (this.ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();

    // Master out (chimes + reverb tail go here)
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.9;
    this.master.connect(this.ctx.destination);

    // Simple feedback-delay "reverb" for depth
    const delay = this.ctx.createDelay(2);
    delay.delayTime.value = 0.42;
    const feedback = this.ctx.createGain();
    feedback.gain.value = 0.4;
    const wet = this.ctx.createGain();
    wet.gain.value = 0.3;
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(wet);
    wet.connect(this.master);
    this.reverbIn = delay;

    // Pad — its own gain so we can fade it independently of chimes
    this.padGain = this.ctx.createGain();
    this.padGain.gain.value = 0;
    const padFilter = this.ctx.createBiquadFilter();
    padFilter.type = "lowpass";
    padFilter.frequency.value = 1600;
    padFilter.Q.value = 0.6;
    this.padGain.connect(padFilter);
    padFilter.connect(this.master);
    padFilter.connect(this.reverbIn);

    // C-major-add9 chord — open, hopeful
    const freqs = [130.81, 196.00, 261.63, 329.63, 392.00]; // C3 G3 C4 E4 G4
    freqs.forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      osc.type = i === 0 ? "triangle" : "sine";
      osc.frequency.value = f;

      // Slow LFO adds life — each voice breathes at a slightly different rate
      const lfo = this.ctx.createOscillator();
      lfo.type = "sine";
      lfo.frequency.value = 0.08 + i * 0.035;
      const lfoDepth = this.ctx.createGain();
      lfoDepth.gain.value = 1.5 + i * 0.4;
      lfo.connect(lfoDepth);
      lfoDepth.connect(osc.frequency);

      const voiceGain = this.ctx.createGain();
      voiceGain.gain.value = 0.18 / freqs.length;

      osc.connect(voiceGain);
      voiceGain.connect(this.padGain);

      osc.start();
      lfo.start();
    });
  }

  async resume() {
    if (!this.ctx) this.init();
    if (this.ctx && this.ctx.state === "suspended") {
      try { await this.ctx.resume(); } catch (_) {}
    }
  }

  async setEnabled(on) {
    await this.resume();
    if (!this.ctx) return;
    this.enabled = on;
    const now = this.ctx.currentTime;
    const target = on ? this.padVolume : 0;
    this.padGain.gain.cancelScheduledValues(now);
    this.padGain.gain.setValueAtTime(this.padGain.gain.value, now);
    this.padGain.gain.linearRampToValueAtTime(target, now + (on ? 2.5 : 1.2));
  }

  // Gentle bell-like chime on a C-major pentatonic note
  chime() {
    if (!this.ctx || !this.enabled) return;
    const notes = [523.25, 587.33, 659.25, 783.99, 880.00]; // C5 D5 E5 G5 A5
    const f = notes[Math.floor(Math.random() * notes.length)];
    const t = this.ctx.currentTime;

    // Fundamental — slow attack, long tail
    this._bellVoice(f, t, 0.14, 2.6, "sine");
    // Octave shimmer — subtler, shorter
    this._bellVoice(f * 2, t + 0.02, 0.05, 1.6, "sine");
    // Soft fifth — adds warmth
    this._bellVoice(f * 1.5, t + 0.05, 0.03, 1.2, "triangle");
  }

  _bellVoice(freq, startTime, peak, duration, type) {
    const osc = this.ctx.createOscillator();
    osc.type = type;
    osc.frequency.value = freq;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, startTime);
    g.gain.linearRampToValueAtTime(peak, startTime + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0005, startTime + duration);
    osc.connect(g);
    g.connect(this.master);
    g.connect(this.reverbIn);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  }
}

window.ambience = new Ambience();
