const r = /\d+(\.\d+)?/

module.exports = s => {
  s = s.toLowerCase()
  if (s.endsWith('kb') || s.endsWith('kib')) { return Number(s.match(r)[0]) / 1024 / 1024 }
  if (s.endsWith('mb') || s.endsWith('mib')) { return Number(s.match(r)[0]) / 1024 }
  if (s.endsWith('gb') || s.endsWith('gib')) { return Number(s.match(r)[0]) }
  if (s.endsWith('tb') || s.endsWith('tib')) { return Number(s.match(r)[0]) * 1024 }
}
