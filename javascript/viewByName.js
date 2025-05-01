const urlParams = new URLSearchParams(window.location.search);
const targetNama = urlParams.get('nama');

const databaseSheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vToAuXPbEoxBSVi4_IYEhkGt85yVpyLPxTbsxrFbkdNg2OFhfpBTIX9dj7m5sBL5UcclSFcDGY2wiOU/pub?gid=998006305&single=true&output=csv';

fetch(databaseSheetUrl)
  .then(response => response.text())
  .then(csv => {
    const rows = csv
      .trim()
      .split('\n')
      .map(row => row.split(',').map(cell => cell.trim().replace(/^"|"$/g, '')));

    const container = document.getElementById('result');
    if (!container || !targetNama) return;

    const header = rows[0];
    const excludedIndex = [4, 5]; // Kolom tersembunyi
    const jumlahIndex = header.findIndex(h => h.toLowerCase().includes('jumlah'));
    let total = 0;

    const matchingRows = rows.slice(1).filter(row => {
      const nama = row[1]?.toLowerCase();
      return nama === targetNama.toLowerCase();
    });

    if (matchingRows.length === 0) {
      container.innerHTML = `<p>Data untuk <strong>${targetNama}</strong> tidak ditemukan.</p>`;
      return;
    }

    const table = document.createElement('table');

    // THEAD
    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');
    header.forEach((cell, i) => {
      if (!excludedIndex.includes(i)) {
        const th = document.createElement('th');
        th.textContent = cell;
        headRow.appendChild(th);
      }
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    // TBODY
    const tbody = document.createElement('tbody');
    matchingRows.forEach(row => {
      const tr = document.createElement('tr');
      row.forEach((cell, i) => {
        if (!excludedIndex.includes(i)) {
          const td = document.createElement('td');
          if (i === jumlahIndex) {
            const num = parseInt(cell.replace(/[^\d]/g, '')) || 0;
            total += num;
            td.textContent = formatNumber(num);
          } else {
            td.textContent = cell;
          }
          tr.appendChild(td);
        }
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    // TFOOT
    if (jumlahIndex >= 0) {
      const tfoot = document.createElement('tfoot');
      const tr = document.createElement('tr');
      header.forEach((_, i) => {
        const td = document.createElement('td');
        if (!excludedIndex.includes(i)) {
          if (i === jumlahIndex) {
            td.textContent = `Total: ${formatNumber(total)}`;
          }
          tr.appendChild(td);
        }
      });
      tfoot.appendChild(tr);
      table.appendChild(tfoot);
    }

    container.appendChild(table);
  })
  .catch(error => {
    console.error('Gagal mengambil data DATABASE:', error);
    document.getElementById('result').innerHTML = '<p>Gagal mengambil data.</p>';
  });

function formatNumber(num) {
  return num.toLocaleString('id-ID');
}
