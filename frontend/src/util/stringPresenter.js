export const capitalize = word => (
  word[0].toUpperCase() + word.slice(1)
);
export const handlePluralizeWith = (word, pluralWanted, pluralType = 's') => (
  `${word}${pluralWanted ? pluralType : ''}`
);

