

export function imageBase64ToBlob(dataURL: string) {
  const arr = dataURL.split(',');
  // @ts-ignore
  const type = /^data:([^;]+?);base64/.exec(arr[0])[1] || 'image/png';
  const str = atob(arr[1]);
  const u8 = new Uint8Array(str.length);
  for (let i = str.length - 1; i >= 0; i--) {
    u8[i] = str.charCodeAt(i);
  }
  const blob = new Blob([u8], {type});
  return blob;
}