const databaseSheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vToAuXPbEoxBSVi4_IYEhkGt85yVpyLPxTbsxrFbkdNg2OFhfpBTIX9dj7m5sBL5UcclSFcDGY2wiOU/pub?gid=0&single=true&output=csv';

fetch(databaseSheetUrl)
  .then(response => response.text())
  .then(csv => {
    const rows = csv.split('\n').map(row => row.split(','));
    const list = document.getElementById('nama-database');
    if (!list) return;

    rows.slice(1).forEach(row => {
      const nama = row[1]?.trim(); // Kolom B
      if (nama) {
        const li = document.createElement('li');
        li.textContent = nama;
        list.appendChild(li);
      }
    });
  })
  .catch(error => {
    console.error('Gagal mengambil data DATABASE:', error);
  });

