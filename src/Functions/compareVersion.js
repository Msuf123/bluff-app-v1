export const compareVersions = (v1, v2) => {
  const p1 = v1.split('.').map(Number);
  const p2 = v2.split('.').map(Number);

  const maxLength = Math.max(p1.length, p2.length);

  for (let i = 0; i < maxLength; i++) {
    const n1 = p1[i] ?? 0;
    const n2 = p2[i] ?? 0;

    if (n1 > n2) return 1;
    if (n1 < n2) return -1;
  }

  return 0;
};
