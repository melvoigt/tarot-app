// The 22 Major Arcana — upright meanings only, tuned toward hope.
// Each interpretation is a warm, specific read for the chosen life area.
const MAJOR_ARCANA = [
  {
    num: 0, name: "The Fool", symbol: "🌅", keywords: ["new beginnings", "leap of faith", "wonder"],
    readings: {
      love: "A new chapter in love is calling. Trust the spark and say yes to connection — whether that means opening your heart again or deepening something already precious.",
      career: "An exciting path is opening. Don't overthink the leap — your instincts are wiser than your doubts, and the world rewards those who begin.",
      spiritual: "You stand at the edge of awakening. Approach your practice with beginner's eyes — wonder is the shortest road to truth.",
      general: "Fresh possibility is knocking. Step forward lightly; the journey ahead holds more joy than you expect."
    }
  },
  {
    num: 1, name: "The Magician", symbol: "✨", keywords: ["manifestation", "willpower", "focus"],
    readings: {
      love: "You have everything you need to create the love you want. Speak it, act on it, believe it — your energy is magnetic right now.",
      career: "This is your moment to manifest. Your skills are sharper than you realize, and the right doors open when you move with intention.",
      spiritual: "You are the bridge between worlds. What you focus on grows — channel your will toward what truly lights you up.",
      general: "You are more powerful than you feel today. Turn the dream into one small first action — you'll be amazed what follows."
    }
  },
  {
    num: 2, name: "The High Priestess", symbol: "🌙", keywords: ["intuition", "inner knowing", "mystery"],
    readings: {
      love: "Your heart already knows. Listen past the noise — the quiet answer inside you is the true one.",
      career: "Your intuition is your best advisor this week. Trust the hunch; the analytical answer can come later.",
      spiritual: "The veil is thin. Meditate, dream, and listen — your inner guidance has gifts waiting for you.",
      general: "Pause and go within. The answer you've been seeking is already waiting in your own wisdom."
    }
  },
  {
    num: 3, name: "The Empress", symbol: "🌹", keywords: ["abundance", "nurture", "creativity"],
    readings: {
      love: "Love is blooming. Nurture yourself first, and watch how tenderness flows naturally between you and those you cherish.",
      career: "Creative abundance is yours. Lean into projects that feel alive — your work is becoming a garden.",
      spiritual: "You are deeply held by the earth and the divine feminine. Let yourself receive as fully as you give.",
      general: "Abundance is arriving through softness. Care for what matters, and it will care for you back."
    }
  },
  {
    num: 4, name: "The Emperor", symbol: "👑", keywords: ["structure", "leadership", "stability"],
    readings: {
      love: "Steady, dependable love is forming. Build foundations — consistency is the most romantic thing you can offer right now.",
      career: "You have the authority to lead. Set clear goals and claim your seat at the table — you've earned it.",
      spiritual: "Discipline is your path to freedom. A simple daily practice will deepen everything.",
      general: "You are the architect. Structure creates safety, and safety makes room for joy to grow."
    }
  },
  {
    num: 5, name: "The Hierophant", symbol: "🕊️", keywords: ["wisdom", "tradition", "guidance"],
    readings: {
      love: "Meaningful commitment is in the air. Honor the bonds that have shaped you, and welcome the wisdom of partnership.",
      career: "A mentor or teaching has lessons for you. Learning from experience accelerates your path.",
      spiritual: "You are being called to a deeper teaching. Seek the elders, the books, the practice that speaks to your soul.",
      general: "Wisdom is available to you through community and guidance. You are never walking this path alone."
    }
  },
  {
    num: 6, name: "The Lovers", symbol: "💞", keywords: ["union", "choice", "harmony"],
    readings: {
      love: "A meaningful connection is blossoming or deepening. Choose from the heart, and the rest follows.",
      career: "An aligned choice awaits. Pick the path your values say yes to — that's where your best work lives.",
      spiritual: "Union is your theme — within yourself first. When inner opposites meet, peace begins.",
      general: "An aligned choice is near. When heart, mind, and gut all agree, you know you're on the right road."
    }
  },
  {
    num: 7, name: "The Chariot", symbol: "🏇", keywords: ["momentum", "willpower", "victory"],
    readings: {
      love: "You're moving toward the love you deserve with clarity. Hold your course — what's meant for you cannot miss you.",
      career: "Momentum is on your side. Focus your energy and charge forward — victory is closer than it looks.",
      spiritual: "Your will and your higher self are aligned. Ride this wave — breakthroughs come to those who stay the course.",
      general: "You have the drive to reach your goal. Steer with intention and the path clears before you."
    }
  },
  {
    num: 8, name: "Strength", symbol: "🦁", keywords: ["courage", "gentleness", "inner power"],
    readings: {
      love: "Your open heart is your greatest strength. Lead with gentleness — it disarms every fear.",
      career: "You have more inner power than you realize. Face the challenge with patience and poise; you'll prevail.",
      spiritual: "True strength is tenderness. Your softest qualities are your most sacred ones.",
      general: "Courage looks like calm today. Breathe, smile, and meet the moment — you are enough."
    }
  },
  {
    num: 9, name: "The Hermit", symbol: "🏮", keywords: ["reflection", "inner light", "solitude"],
    readings: {
      love: "A season of self-love is preparing you for something beautiful. Know yourself well — then love flows honestly.",
      career: "Step back to see the bigger picture. Solitude now brings clarity that rushing cannot offer.",
      spiritual: "Your inner light is a lantern for others. Time alone is not loneliness — it's soul-keeping.",
      general: "Rest and reflection are their own progress. Trust the quieter chapters — they carry wisdom."
    }
  },
  {
    num: 10, name: "Wheel of Fortune", symbol: "🎡", keywords: ["cycles", "luck", "change"],
    readings: {
      love: "A beautiful turn is coming in your love life. Stay open — the wheel is spinning in your favor.",
      career: "Good fortune is on your side. Say yes to unexpected opportunities — one of them is the one.",
      spiritual: "You're in a sacred cycle of renewal. Trust the spin; you are always being carried forward.",
      general: "Fortune is tilting toward you. What felt stuck is about to move — beautifully."
    }
  },
  {
    num: 11, name: "Justice", symbol: "⚖️", keywords: ["truth", "fairness", "balance"],
    readings: {
      love: "Honest conversation clears the way. What is true and right will find its place — and you'll feel lighter for it.",
      career: "Your fairness and integrity are being noticed. Recognition and balance are arriving.",
      spiritual: "Align with your truth. When you live by your values, the universe reflects clarity back.",
      general: "Things are balancing in your favor. Trust the fairness of this moment — it's real."
    }
  },
  {
    num: 12, name: "The Hanged Man", symbol: "🙃", keywords: ["perspective", "pause", "surrender"],
    readings: {
      love: "A fresh perspective transforms everything. Pause, look again, and watch something beautiful reveal itself.",
      career: "A pause is a gift, not a setback. The view from here shows a better path forward.",
      spiritual: "Surrender opens the door. Letting go isn't losing — it's making room for grace.",
      general: "See the moment from a new angle. The answer has been there all along, just rotated."
    }
  },
  {
    num: 13, name: "Transformation", symbol: "🦋", keywords: ["rebirth", "release", "renewal"],
    readings: {
      love: "A beautiful transformation is underway. What's ending makes room for love that fits who you truly are.",
      career: "An old chapter is closing so a richer one can open. Trust the change — it's a promotion in disguise.",
      spiritual: "You are being reborn. Shed the old skin lightly — your new self is radiant.",
      general: "Transformation is happening for you, not to you. What's releasing was never meant to stay."
    }
  },
  {
    num: 14, name: "Temperance", symbol: "🌊", keywords: ["balance", "healing", "patience"],
    readings: {
      love: "Harmony is being woven into your relationships. Gentle patience now brings the sweetest results.",
      career: "Balance is your superpower. Blend bold and careful, and you'll craft something extraordinary.",
      spiritual: "You are in sacred alchemy. Patience is the ingredient that turns experience into wisdom.",
      general: "The middle way is the golden way. Healing is happening, one gentle breath at a time."
    }
  },
  {
    num: 15, name: "The Shadow", symbol: "🗝️", keywords: ["awareness", "liberation", "honesty"],
    readings: {
      love: "See the stories you've been telling yourself about love. The chains are lighter than they seem — you already hold the key.",
      career: "Name the fear and watch it loosen. You are freer to change your path than you think.",
      spiritual: "Awareness is the first step to freedom. What you see clearly, you can release.",
      general: "The limits you feel are softer than they look. Gentle honesty sets you free."
    }
  },
  {
    num: 16, name: "The Tower", symbol: "⚡", keywords: ["breakthrough", "revelation", "clearing"],
    readings: {
      love: "A sudden clarity is clearing away what wasn't real. What remains is true, and it's beautiful.",
      career: "A breakthrough is shaking loose what no longer served. Something more aligned is being built.",
      spiritual: "A revelation is lighting up your path. What felt shaken will settle into something truer.",
      general: "A quick clearing is making room for the real. Trust the lightning — it shows the way."
    }
  },
  {
    num: 17, name: "The Star", symbol: "⭐", keywords: ["hope", "renewal", "inspiration"],
    readings: {
      love: "Hope and healing are flowing in. Your heart is opening again, and someone wonderful is noticing.",
      career: "Inspiration is guiding you toward your dream. Keep going — the stars are rooting for you.",
      spiritual: "You are held in divine hope. Make a wish — the universe is listening tonight.",
      general: "Hope is your homeland. Soft, steady, and radiant — that's the energy around you now."
    }
  },
  {
    num: 18, name: "The Moon", symbol: "🌕", keywords: ["intuition", "dreams", "mystery"],
    readings: {
      love: "Listen to your dreams and gut feelings. The mystery is leading you somewhere magical.",
      career: "Not everything is clear yet — and that's okay. Trust your intuition; the fog lifts in perfect time.",
      spiritual: "The subconscious is speaking. Journal your dreams — messages are arriving in symbolic form.",
      general: "The unknown is not unsafe. Moonlight is enough to walk by — one step at a time is perfect."
    }
  },
  {
    num: 19, name: "The Sun", symbol: "☀️", keywords: ["joy", "vitality", "success"],
    readings: {
      love: "Pure, warm love is radiating in your life. Let yourself glow — and let yourself be adored.",
      career: "Success and joy are meeting. Celebrate this chapter — you've earned every ray of it.",
      spiritual: "You are luminous. Let your spirit shine without shrinking — the world needs your light.",
      general: "Joy is your current. Follow what makes you laugh — it's leading you somewhere wonderful."
    }
  },
  {
    num: 20, name: "Judgement", symbol: "📯", keywords: ["awakening", "calling", "renewal"],
    readings: {
      love: "A soul-level call to love is here. Answer with your whole heart — forgiveness and fresh starts are blessed now.",
      career: "Your calling is getting louder. Say yes to the path that makes you feel alive — it's your time.",
      spiritual: "A great awakening is happening within you. Listen to the call — you were born for this.",
      general: "A new chapter of you is being born. Rise — you are ready for the beautiful next."
    }
  },
  {
    num: 21, name: "The World", symbol: "🌍", keywords: ["completion", "wholeness", "celebration"],
    readings: {
      love: "A beautiful completion blooms into a richer beginning. You are whole, loved, and ready.",
      career: "You're reaching a wonderful milestone. Celebrate fully — a grander chapter follows this one.",
      spiritual: "You are the completion of a sacred cycle. Dance in gratitude — you have arrived.",
      general: "Wholeness is yours. Take a breath of thanks — then step into the next adventure."
    }
  }
];

const THEME_META = {
  love:      { label: "Love",      icon: "💞", intro: "Here's what love is whispering to you today." },
  career:    { label: "Career",    icon: "✨", intro: "Here's what your path and purpose want you to hear." },
  spiritual: { label: "Spiritual", icon: "🌙", intro: "Here's what your soul has been waiting to share." },
  general:   { label: "General",   icon: "🌟", intro: "Here's what the cards want you to know today." }
};

const POSITIONS_3 = [
  { label: "Past",    note: "what brought you here" },
  { label: "Present", note: "where you stand now" },
  { label: "Future",  note: "what is unfolding" }
];
