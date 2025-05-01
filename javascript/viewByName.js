const urlParams = new URLSearchParams(window.location.search);
const targetNama = urlParams.get('nama');

const databaseSheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vToAuXPbEoxBSVi4_IYEhkGt85yVpyLPxTbsxrFbkdNg2OFhfpBTIX9dj7m5sBL5UcclSFcDGY2wiOU/pub?gid=998006305&single=true&output=csv';


fetch(databaseSheetUrl)
  .then(response => response.text())
  .then(csv => {
    const rows = csv
      .split('\n')
      .map(row => row.split(',').map(cell => cell.trim().replace(/^"|"$/g, '')));

    const container = document.getElementById('result');
    if (!container || !targetNama) return;

    const header = rows[0];
    const matchingRows = rows.slice(1).filter(row => {
      const nama = row[1]?.toLowerCase();
      return nama === targetNama.toLowerCase();
    });

    if (matchingRows.length === 0) {
      container.innerHTML = `<p>Data untuk <strong>${targetNama}</strong> tidak ditemukan.</p>`;
      return;
    }

    const table = document.createElement('table');
    table.innerHTML = `<thead><tr>${header.map(h => `<th>${h}</th>`).join('')}</tr></thead>`;

    const tbody = document.createElement('tbody');
    matchingRows.forEach(row => {
      const tr = document.createElement('tr');
      row.forEach(cell => {
        const td = document.createElement('td');
        td.textContent = cell;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    container.appendChild(table);
  })
  .catch(error => {
    console.error('Gagal mengambil data DATABASE:', error);
    document.getElementById('result').innerHTML = '<p>Gagal mengambil data.</p>';
  });
