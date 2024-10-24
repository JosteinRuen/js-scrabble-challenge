const letterScores = {
  A: 1, E: 1, I: 1, O: 1, U: 1,
  L: 1, N: 1, R: 1, S: 1, T: 1,
  D: 2, G: 2,
  B: 3, C: 3, M: 3, P: 3,
  F: 4, H: 4, V: 4, W: 4, Y: 4,
  K: 5,
  J: 8, X: 8,
  Q: 10, Z: 10
};

function scrabble(word) {
  if (!word) return 0;

  let totalScore = 0;
  let wordMultiplier = 1;
  let letterMultiplier = 1; // Default multiplier for each letter

  // Handle word multipliers if the word starts and ends with special braces
  if (word.startsWith('[') && word.endsWith(']')) {
    wordMultiplier = 3; // Triple word score
    word = word.slice(1, -1);
    if (word.startsWith('{') && word.endsWith('}')) {
      wordMultiplier *= 2; // Apply both triple and double word scores
      word = word.slice(1, -1);
    }
  } else if (word.startsWith('{') && word.endsWith('}')) {
    wordMultiplier = 2; // Double word score
    word = word.slice(1, -1);
  }

  // Iterate through each character in the word
  for (let i = 0; i < word.length; i++) {
    let char = word[i];

    // Check for double or triple letter scores
    if (char === '{') {
      if (i + 2 < word.length && word[i + 2] === '}') {
        char = word[i + 1].toUpperCase();
        letterMultiplier = 2; // Double letter score
        i += 2; // Skip over the closing brace
      } else {
        return 0; // Invalid brace usage
      }
    } else if (char === '[') {
      if (i + 2 < word.length && word[i + 2] === ']') {
        char = word[i + 1].toUpperCase();
        letterMultiplier = 3; // Triple letter score
        i += 2; // Skip over the closing brace
      } else {
        return 0; // Invalid brace usage
      }
    } else if (char === '}' || char === ']') {
      return 0; // Invalid brace character in the middle of the word
    } else {
      char = char.toUpperCase(); // Make sure the character is uppercase
    }

    // Validate if the character exists in letterScores
    if (letterScores[char]) {
      totalScore += letterScores[char] * letterMultiplier;
      letterMultiplier = 1; // Reset letter multiplier after applying it
    } else {
      return 0; // Invalid character in word
    }
  }

  // Apply word multiplier (if any) to total score
  return totalScore * wordMultiplier;
}

module.exports = scrabble;
