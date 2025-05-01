const databaseSheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vToAuXPbEoxBSVi4_IYEhkGt85yVpyLPxTbsxrFbkdNg2OFhfpBTIX9dj7m5sBL5UcclSFcDGY2wiOU/pub?gid=0&single=true&output=csv';

const excludedIndex = [4, 5]; // Sembunyikan kolom TGL INPUT dan BENDAHARA

fetch(databaseSheetUrl)
  .then(response => response.text())
  .then(csv => {
    const rows = csv.split('\n').map(row => row.split(','));
    const list = document.getElementById('nama-database');
    if (!list) return;

    const headers = rows[0];

    rows.slice(1).forEach(row => {
      const filteredData = row
        .map((cell, index) => ({ index, value: cell.trim() }))
        .filter(cell => !excludedIndex.includes(cell.index));

      const li = document.createElement('li');
      li.innerHTML = filteredData.map(cell => `${headers[cell.index]}: ${cell.value}`).join(' | ');
      list.appendChild(li);
    });
  })
  .catch(error => {
    console.error('Gagal mengambil data DATABASE:', error);
  });
