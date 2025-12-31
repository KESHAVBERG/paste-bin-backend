export const renderPasteHTML = (content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Paste</title>
</head>
<body>
  <pre>${escapeHtml(content)}</pre>
</body>
</html>
`;

const escapeHtml = (str) =>
  str.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[
        c
      ])
  );
