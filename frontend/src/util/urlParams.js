export default function paramTypePresent(match, type) {
  return match && match.params && match.params[type];
}

