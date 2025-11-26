/*
TIKO RAVINTOLA
OHJELMAKOODI
*/

const Ravintola = function () {
  this.alkuruoat = [
    { ruoka: 'Tomaattikeitto', hinta: 4 },
    { ruoka: 'Leipä', hinta: 3 },
    { ruoka: 'Vihersalaatti', hinta: 5 },
    { ruoka: 'Salsa', hinta: 4 },
  ];
  this.paaruoat = [
    { ruoka: 'Kalakeitto', hinta: 8 },
    { ruoka: 'Makaroonilaatikko', hinta: 7 },
    { ruoka: 'Kasvispihvi', hinta: 9 },
    { ruoka: 'Kanasalaatti', hinta: 8 },
  ];
  this.jalkiruoat = [
    { ruoka: 'Hedelmäsalaatti', hinta: 4 },
    { ruoka: 'Jäätelö', hinta: 3 },
    { ruoka: 'Pulla', hinta: 2 },
    { ruoka: 'Donitsi', hinta: 3 },
  ];
  this.juomat = [
    { ruoka: 'Tee', hinta: 2 },
    { ruoka: 'Kahvi', hinta: 3 },
    { ruoka: 'Maito', hinta: 2 },
    { ruoka: 'Mehu', hinta: 3 },
  ];

  this.paikkojenMaara = 15;
  this.paikat; // Paikkataulukko
};

/**
 * Palauttaa satunnaisen boolean arvon
 * @return {boolean} Randomized boolean
 */
function generoiBoolean() {
  return Math.random() < 0.5;
}

/**
 * Tarkistaa, että 'asiakkaidenMaara' on suurempi kuin 0 mutta pienempi tai yhtäsuuri kuin 'paikkojenMaara'.
 * Jos asiakkaidenMaara ei ole numero → heittää TypeErrorin.
 *
 * @param {number} asiakkaidenMaara
 * @return {boolean}
 */
Ravintola.prototype.tarkistaPaikkojenMaara = function (asiakkaidenMaara) {
  if (typeof asiakkaidenMaara !== 'number') {
    throw new TypeError();
  }
  if (asiakkaidenMaara <= 0) {
    console.log(
      'Ikävä kyllä emme voi tarjoilla ' + asiakkaidenMaara + ' asiakkaalle.'
    );
    return false;
  } else if (asiakkaidenMaara <= this.paikkojenMaara) {
    console.log(
      'Tilaa on ' + asiakkaidenMaara + ' asiakkaalle. Tervetuloa ravintolaamme!'
    );
    return true;
  } else {
    console.log(
      'Ikävä kyllä ravintolaamme ei mahdu ' + asiakkaidenMaara + ' asiakasta.'
    );
    return false;
  }
};

/**
 * Luo paikat-taulukon, jonka koko on paikkojenMaara.
 * Kaikki paikat asetetaan arvoon false (vapaa).
 *
 * @return {boolean[]} paikat-taulukko
 */
Ravintola.prototype.generoiPaikat = function () {
  this.paikat = new Array(this.paikkojenMaara).fill(false);
  return this.paikat;
};

/**
 * Varaa halutun määrän paikkoja ravintolasta.
 * - Jos paikat ei ole taulukko → luodaan generoiPaikat()
 * - Jos varauksenMaara puuttuu → oletuksena 1
 * - Lasketaan vapaat paikat (false)
 * - Jos vapaita on liian vähän → palauttaa false
 * - Muuten muutetaan ensimmäiset vapaana olevat paikat true-arvoiksi
 *
 * @param {number} [varauksenMaara=1]
 * @return {boolean} Onnistuiko varaus
 */
Ravintola.prototype.varaaPaikat = function (varauksenMaara) {
  if (!Array.isArray(this.paikat)) {
    this.generoiPaikat();
  }

  if (typeof varauksenMaara !== 'number') {
    varauksenMaara = 1;
  }

  const vapaat = this.paikat.filter((p) => p === false).length;

  if (vapaat < varauksenMaara) {
    return false;
  }

  let varattavia = varauksenMaara;
  for (let i = 0; i < this.paikat.length && varattavia > 0; i++) {
    if (!this.paikat[i]) {
      this.paikat[i] = true;
      varattavia--;
    }
  }

  return true;
};

/**
 * SyoRavintolassa:
 * - Tarkistetaan asiakasmäärä
 * - Varmistetaan että paikat voidaan varata
 * - Tehdään asiakkaille tilaukset
 *
 * @param {number} asiakkaidenMaara
 * @return {object[]} tilaukset
 */
Ravintola.prototype.syoRavintolassa = function (asiakkaidenMaara) {
  const onTilaa = this.tarkistaPaikkojenMaara(asiakkaidenMaara);
  if (!onTilaa) return;

  if (!this.varaaPaikat(asiakkaidenMaara)) {
    console.log('Paikkoja ei ollut riittävästi.');
    return;
  }

  const tilaukset = [];

  for (let i = 0; i < asiakkaidenMaara; i++) {
    console.log('-------------------------------------------------------');
    console.log(
      'Tarjoillaan asiakasta numero ' + (i + 1) + '. Mitä teille saisi olla?'
    );

    tilaukset.push(this.tilaaAteria());
    console.log('Asiakkaalle tarjoiltu. Hyvää ruokahalua!');
  }
  console.log('-------------------------------------------------------');
  console.log('Kaikille asiakkaille tarjoiltu!');

  return tilaukset;
};

/**
 * Luo asiakkaalle ateriatilauksen:
 * - Alkuruoka (satunnainen mahdollisuus)
 * - Pääruoka (aina)
 * - Jälkiruoka (satunnainen)
 * - Juoma (satunnainen)
 *
 * @return {object} { summa, ruoat[] }
 */
Ravintola.prototype.tilaaAteria = function () {
  const ruoat = [];

  if (generoiBoolean()) {
    const a = this.palautaTaulukonSatunnainenArvo(this.alkuruoat);
    console.log('Alkuruoka: ' + a.ruoka);
    ruoat.push(a);
  }

  const p = this.palautaTaulukonSatunnainenArvo(this.paaruoat);
  console.log('Pääruoka: ' + p.ruoka);
  ruoat.push(p);

  if (generoiBoolean()) {
    const j = this.palautaTaulukonSatunnainenArvo(this.jalkiruoat);
    console.log('Jälkiruoka: ' + j.ruoka);
    ruoat.push(j);
  }

  if (generoiBoolean()) {
    const ju = this.palautaTaulukonSatunnainenArvo(this.juomat);
    console.log('Juoma: ' + ju.ruoka);
    ruoat.push(ju);
  }

  const summa = this.laskeLasku(ruoat);

  return { summa, ruoat: ruoat.map((r) => r.ruoka) };
};

/**
 * Palauttaa satunnaisen arvon annetusta taulukosta
 *
 * @param {object[]} taulukko
 * @return {object}
 */
Ravintola.prototype.palautaTaulukonSatunnainenArvo = function (taulukko) {
  return taulukko[Math.floor(Math.random() * taulukko.length)];
};

/**
 * Laskee summan annetun ruokalistan perusteella.
 *
 * @param {object[]} ruoat
 * @return {number}
 */
Ravintola.prototype.laskeLasku = function (ruoat) {
  return ruoat.reduce((sum, r) => sum + r.hinta, 0);
};

const ravintola = new Ravintola();

export default ravintola;
