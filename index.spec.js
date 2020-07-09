describe('Prueba', () => {
  describe('suma', () => {
    it('suma dos números', () => {
      const suma = (a, b) => {
        return a + b;
      };
      expect(suma(1, 2)).toEqual(3);
    });
  });
});
