module.exports = s => {
  s = s.toLowerCase()
  if (s.endsWith('kb') || s.endsWith('kib')) { return Number.parseFloat(s) / 1024 / 1024 }
  if (s.endsWith('mb') || s.endsWith('mib')) { return Number.parseFloat(s) / 1024 }
  if (s.endsWith('gb') || s.endsWith('gib')) { return Number.parseFloat(s) }
  if (s.endsWith('tb') || s.endsWith('tib')) { return Number.parseFloat(s) * 1024 }
}
