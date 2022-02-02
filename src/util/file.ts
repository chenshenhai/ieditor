

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

export function pickFile (opts: {
  success: (data: { file?: File }) => void;
  error?: (err: ErrorEvent) => void;
}) {
  const { success, error } = opts;
  let input: HTMLInputElement | null = document.createElement('input');
  input.type = 'file';
  input.addEventListener('change', function() {
    const file: File | undefined = this?.files?.[0];
    success({
      file: file,
    });
    input = null;
  });
  input.addEventListener('error', function(err) {
    if (typeof error === 'function') {
      error(err);
    }
    input = null;
  })
  input.click();
}

export function parseFileToBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise(function(resolve, reject) {
    let reader: FileReader | null = new FileReader();
    reader.addEventListener('load', function() {
      resolve(this.result);
      reader = null;
    });
    reader.addEventListener('error', function(err) {
      // reader.abort();
      reject(err);
      reader = null;
    });
    reader.addEventListener('abort', function() {
      reject(new Error('abort'));
      reader = null;
    })
    reader.readAsDataURL(file);
  })
} 