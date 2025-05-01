const alumniSheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vToAuXPbEoxBSVi4_IYEhkGt85yVpyLPxTbsxrFbkdNg2OFhfpBTIX9dj7m5sBL5UcclSFcDGY2wiOU/pub?gid=1088860757&single=true&output=csv';

fetch(alumniSheetUrl)
  .then(response => response.text())
  .then(csv => {
    const rows = csv.split('\n').map(row => row.split(','));
    const list = document.getElementById('list-alumni');
    if (!list) return;

    rows.slice(1).forEach(row => {
      const no = row[0]?.trim();
      const nama = row[1]?.trim();
      if (no && nama) {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = `ViewAlumnus.html?nama=${encodeURIComponent(nama)}`;
        link.textContent = `${no}. ${nama}`;
        li.appendChild(link);
        list.appendChild(li);
      }
    });
  })
  .catch(error => {
    console.error('Gagal mengambil data alumni:', error);
  });
