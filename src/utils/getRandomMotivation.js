const motivations = [
  {
    text: "Beberapa orang memimpikan kesuksesan, sementara yang lain bangun setiap pagi untuk mewujudkannya.",
    author: "Wayne Huizenga",
  },
  {
    text: "Pekerjaan-pekerjaan kecil yang selesai dilakukan lebih baik daripada rencana-rencana besar yang hanya didiskusikan.",
    author: "Peter Marshall",
  },
  {
    text: "Jangan katakan Anda tidak punya cukup waktu. Anda memiliki jumlah jam yang persis sama per hari yang diberikan kepada Helen Keller, Pasteur, Michelangelo, Mother Teresea, Leonardo da Vinci, Thomas Jefferson, dan Albert Einstein.",
    author: " H. Jackson Brown Jr.",
  },
  {
    text: "Ada dua jenis orang di dunia ini: mereka yang ingin menyelesaikan sesuatu dan mereka yang tidak ingin membuat kesalahan.",
    author: "John Maxwell",
  },
  {
    text: "Jangan pernah menganggap belajar sebagai tugas, tetapi anggaplah sebagai kesempatan berharga untuk mempelajari sesuatu.",
    author: "Albert Einstein",
  },
];

export const getRandomMotivation = () => {
  return motivations[Math.floor(Math.random() * motivations.length)];
};
