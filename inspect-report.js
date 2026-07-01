const fs = require('fs');
const r = JSON.parse(fs.readFileSync('reports/cucumber-report.json', 'utf8'));
r.forEach(s => {
  console.log('---');
  console.log('name:', s.name);
  if (s.before) {
    s.before.forEach(b => {
      console.log('  before:', b.result.status, 'duration:', b.result.duration, 'err:', (b.result.message || '').slice(0, 200));
    });
  }
  s.steps.forEach(st => {
    console.log('  ', st.result.status, st.keyword + st.name, 'dur:', st.result.duration, 'err:', (st.result.message || '').slice(0, 200));
  });
});
