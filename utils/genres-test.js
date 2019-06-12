const gens = require('../genres/index');

console.log(gens.getGenres('verified.json'));
console.log(gens.addGenre('verified.json', 'XYZ'));
console.log(gens.getGenres('verified.json'));
