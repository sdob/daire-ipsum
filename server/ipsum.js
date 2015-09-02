'use strict';

var random = require('random-js');
var range = require('range');
var _ = require('lodash');

var phrases = [
  'which?',
  'Chrisht, lads',
  'shower of bastards',
  'savage',
  'to be fair',
  'the lads',
  'a pint\'s a pint',
  'diving diving diving',
  'I have DODs for this shit',
  'for fuck\'s sake',
  'when I was in Nice'
];

var lorem = [ 'lorem', 'ipsum', 'consectetur', 'adipisicing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'ut', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'dolor', 'in', 'reprehenderit', 'in', 'voluptate', 'velit', 'esse', 'cillum', 'dolore', 'eu', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'in', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', ];

var engine = random.engines.nativeMath;

function sentence(factor) {
  // Validate Dairefication factor and constrain to [0, 1]
  var factor = +factor || ((factor == 0) ? factor : 0.5);
  if (factor < 0) factor = 0;
  if (factor > 1) factor = 1;

  // A sentence is between 4 and 15 words long
  var length = random.integer(4, 15)(engine);

  // Build the sentence
  var sentence = '';
  while (sentence.split(' ').length < length) {
    // Under certain conditions, add a comma
    if (sentence.length > 0 && length >= 7 && sentence.lastIndexOf(',') < 0  &&
        random.bool(0.6)(engine)) {
    sentence += ",";
    }

    if (random.bool(factor)(engine)) {
      var nextPhrase = phrases[random.integer(0, phrases.length - 1)(engine)];
      sentence += " " + nextPhrase;
      if (sentence.slice(-1) == '?') { // Terminate early on question mark
        break;
      }
    }
    else {
      sentence += " " + lorem[random.integer(0, lorem.length - 1)(engine)];
    }
  }
  return _.capitalize(sentence.trim()) + (sentence.slice(-1) == '?' ? '' : '.');
}

function paragraph(factor) {
  var length = random.integer(4, 7)(engine);
  return range.range(length)
  .map(function generateSentence() { return sentence(factor); })
  .join(' ');
}

function paragraphs(num, factor) {
  return range.range(num)
  .map(function generateParagraph() {return paragraph(factor); });
}

module.exports = {
  sentence: sentence,
  paragraph: paragraph,
  paragraphs: paragraphs
};
