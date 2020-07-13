import mergeRanges from 'merge-ranges';
import { remove } from 'diacritics';

function parse(text, matches) {
  var result = [];

  if (matches.length === 0) {
    result.push({
      text: text,
      highlight: false,
    });
  } else {
    if (matches[0][0] > 0) {
      result.push({
        text: text.slice(0, matches[0][0]),
        highlight: false,
      });
    }
  }

  for (let i = 0; i < matches.length; i++) {
    const [startIndex, endIndex] = matches[i];
    result.push({
      text: text.slice(startIndex, endIndex),
      highlight: true,
    });

    if (i === matches.length - 1) {
      if (endIndex < text.length) {
        result.push({
          text: text.slice(endIndex, text.length),
          highlight: false,
        });
      }
    } else if (endIndex < matches[i + 1][0]) {
      result.push({
        text: text.slice(endIndex, matches[i + 1][0]),
        highlight: false,
      });
    }
  }

  return result;
}

function allIndexesOf(str, word) {
  const indexes = [];
  for (
    let idx = str.indexOf(word);
    idx !== -1;
    idx = str.indexOf(word, idx + 1)
  ) {
    indexes.push(idx);
  }
  return indexes;
}

export default function highlightText(text, highlight) {
  const normalizedText = remove(text).toLowerCase();
  const highlightIntervals = highlight.split().reduce((intervals, word) => {
    const normalizedWord = remove(word).toLowerCase();
    const wordIntervals = allIndexesOf(
      normalizedText,
      normalizedWord
    ).map(idx => [idx, idx + normalizedWord.length]);
    return intervals.concat(wordIntervals);
  }, []);

  return parse(text, mergeRanges(highlightIntervals));
}
