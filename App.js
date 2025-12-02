const form = document.getElementById('obsForm');
const ul = document.getElementById('observations');
const counts = document.getElementById('counts');

let data = JSON.parse(localStorage.getItem('obs')||'[]');

function render(){
  ul.innerHTML = '';
  let c = {Low:0, Medium:0, High:0};
  data.forEach((o,i)=> {
    c[o.severity] = (c[o.severity]||0)+1;
    const li = document.createElement('li');
    li.textContent = `[${o.severity}] ${o.location} — ${o.text}`;
    ul.appendChild(li);
  });
  counts.innerHTML = `Low: ${c.Low} | Medium: ${c.Medium} | High: ${c.High}`;
}

form.addEventListener('submit', e=>{
  e.preventDefault();
  const f = new FormData(form);
  const obs = {
    location: f.get('location'),
    text: f.get('text'),
    severity: f.get('severity'),
    ts: new Date().toISOString()
  };
  data.unshift(obs);
  localStorage.setItem('obs', JSON.stringify(data));
  form.reset();
  render();
});

render();
