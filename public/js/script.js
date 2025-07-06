async function fetchSGP() {
  try {
    const res = await fetch('/api/sgp4d');
    const data = await res.json();
    const today = data[0];
    document.getElementById('today').innerHTML = `<strong>${today.date}</strong> → <span class='angka'>${today.result}</span>`;

    const tbody = document.querySelector('#history tbody');
    tbody.innerHTML = '';
    data.slice(1, 8).forEach(d => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${d.date}</td><td>${d.result}</td>`;
      tbody.appendChild(tr);
    });
  } catch (err) {
    document.getElementById('today').innerText = 'Gagal memuat data.';
    console.error(err);
  }
}
document.addEventListener('DOMContentLoaded', fetchSGP);
