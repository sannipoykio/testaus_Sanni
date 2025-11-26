import { describe, expect, it, assert } from 'vitest';
import ravintola from '../ravintola/ravintola.js';

describe('ravintolasovelluksen testaus', function () {
  it('should return correct sum from laskeLasku when customer picks main course, starter, dessert and no drink', function () {
    expect(ravintola.laskeLasku(true, true, false)).toBe(14);
  });
  it('should return a value from one of the arrays in Ravintola (alkuruoat, paaruoat, jalkiruoat tai juomat.)', () => {
    const testiArvoTaulukosta = ravintola.palautaTaulukonSatunnainenArvo(
      ravintola.juomat
    );
    const taulukkoTestattavaksi = ravintola.juomat;
    assert.include(
      taulukkoTestattavaksi,
      testiArvoTaulukosta,
      'Taulukko ei sisällä arvoa'
    );
  });
});
