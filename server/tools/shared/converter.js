const map = {
  'Yu-Gi-Oh! Zexal': ['Yu☆Gi☆Oh! Zexal'],
  'Yu-Gi-Oh! Zexal Second': ['Yu☆Gi☆Oh! Zexal Second'],
  'Yu-Gi-Oh! VRAINS' : ['Yu☆Gi☆Oh! VRAINS'],
  'Yu-Gi-Oh!': ['Yu☆Gi☆Oh!', 'Yu☆Gi☆Oh! (1999)'],
  'Yu-Gi-Oh! Duel Monsters': ['Yu☆Gi☆Oh! Duel Monsters'],
  'Yu-Gi-Oh! Duel Monsters GX': ['Yu☆Gi☆Oh!: Duel Monsters GX'],
  'Yu-Gi-Oh! 5D\'s': ['Yu☆Gi☆Oh! 5D\'s'],
  'Yu-Gi-Oh! Arc-V': ['Yu☆Gi☆Oh! ARC-V'],
  'Mahou Shoujo Madoka★Magica': ['Mahou Shoujo Madoka★Magica', 'Puella Magi Madoka★Magica'],
  'Suzumiya Haruhi no Yuuutsu (The Melancholy of Haruhi Suzumiya)': ['Suzumiya Haruhi no Yuuutsu', 'Suzumiya Haruhi no Yuuutsu (2009)', 'Suzumiya Haruhi no Yuuutsu (The Melancholy of Haruhi Suzumiya) [2009]'],
  'Suzumiya Haruhi no Shoushitsu (The Disappearance of Haruhi Suzumiya)': ['Suzumiya Haruhi no Shoushitsu'],
  'Toaru Kagaku no Railgun (A Certain Scientific Railgun)': ['Toaru Kagaku no Railgun'],
  'Toaru Kagaku no Railgun S (A Certain Scientific Railgun 2nd Season)': ['Toaru Kagaku no Railgun S'],
  'Clannad ~After Story~': ['Clannad: After Story'],
  'Code Geass: Hangyaku no Lelouch': ['Code Geass'],
  'Code Geass: Hangyaku no Lelouch R2': ['Code Geass R2'],
  'Akame ga Kill!': ['Akame ga Kill'],
  'Shingeki no Kyojin (Attack on Titan)': ['Shingeki no Kyojin', 'Shingeki no Kyojin OVA'],
  'Shingeki no Kyojin Season 2 (Attack on Titan Season 2)': ['Shingeki no Kyojin Season 2'],
  'Shingeki no Kyojin Season 3 (Attack on Titan Season 3)': ['Shingeki no Kyojin Season 3', 'Shingeki no Kyojin Season 3 Part 2'],
  'Log Horizon': ['Log Horizon 2nd Season', 'Log Horizon 2'],
  'Sword Art Online II': ['Sword Art Online 2'],
  'Shokugeki no Souma: Ni no Sara (Food Wars! The Second Plate)': ['Shokugeki no Souma: Ni no Sara'],
  'Shokugeki no Souma: San no Sara (Food Wars! The Third Plate)': ['Shokugeki no Souma: San no Sara'],
  'Shokugeki no Souma: San no Sara - Toutsuki Ressha-hen (Food Wars! The Third Plate Part 2)': ['Shokugeki no Souma: San no Sara - Toutsuki Ressha-hen'],
  'Sakurasou no Pet na Kanojo (The Pet Girl of Sakurasou)': ['Sakurasou no Pet na Kanojo'],
  'New Game!': ['NEW GAME!'],
  'Kyoukai no Kanata (Beyond the Boundary)': ['Kyoukai no Kanata'],
  'Shigatsu wa Kimi no Uso (Your Lie in April)': ['Shigatsu wa Kimi no Uso'],
  'Mahoutsukai no Yome (The Ancient Magus Bride)': ['Mahoutsukai no Yome'],
  'Nagi no Asukara (A Lull in the Sea)': ['Nagi no Asukara'],
  'Digimon Adventure tri.': ['Digimon Adventure tri. 1: Saikai', 'Digimon Adventure tri. 2: Ketsui'],
  'Mahou Shoujo Ikusei Keikaku (Magical Girl Raising Project)': ['Mahou Shoujo Ikusei Keikaku'],
  'Yuuki Yuuna wa Yuusha de Aru (Yuuki Yuuna is a Hero)': ['Yuuki Yuuna wa Yuusha de Aru: Hidamari', 'Yuuki Yuuna wa Yuusha de Aru'],
  'Yuuki Yuuna wa Yuusha de Aru: Yuusha no Shou (Yuuki Yuuna is a Hero: The Hero Chapter)': ['Yuuki Yuuna wa Yuusha de Aru: Yuusha no Shou'],
  'Gakkou Gurashi! (School-Live!)': ['Gakkou Gurashi!'],
  'Ookami to Koushinryou (Spice and Wolf)': ['Ookami to Koushinryou'],
  'Ookami to Koushinryou II (Spice and Wolf II)': ['Ookami to Koushinryou II'],
  'Boku dake ga Inai Machi (ERASED)': ['Boku dake ga Inai Machi'],
  'Anohana.': ['Ano Hi Mita Hana no Namae wo Bokutachi wa Mada Shiranai.'],
  'Eromanga-sensei': ['Eromanga-sensei', 'Eromanga-sensei OVA'],
  'Genei wo Kakeru Taiyou (Day Break Illusion)': ['Genei wo Kakeru Taiyou']
}


class Converter {
  mapName(name) {
    for (var key in map) {
      for (var item of map[key]) {
        if (item === name.toString().trim()) {
          return key
        }
      }
    }
    return name
  }
}

module.exports = new Converter()