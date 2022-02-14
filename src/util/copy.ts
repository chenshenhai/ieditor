import { generateUuid } from './uuid';
const copyInputId = `copy-temp-input-${generateUuid()}`;



function getCopyInput(): HTMLInputElement {
  const exitInput = document.getElementById(copyInputId)
  if (exitInput && exitInput instanceof HTMLInputElement) {
    return exitInput;
  }
  const input = document.createElement('input');
  input.id = copyInputId;
  input.style.width = '1px';
  input.style.height = '1px';
  input.style.position = 'fixed';
  input.style.left = '-99999px';
  input.style.top = '-99999px';
  document.body.appendChild(input);
  return input;
}

export const copyHtml = (html: string) => {
  const input = getCopyInput();
  input.value = 'Null';
  input.setSelectionRange(0, 1);
  input.focus();
  document.addEventListener('copy', function copyCall(e) {
    e.preventDefault();
    e.clipboardData?.setData('text/html', html);
    e.clipboardData?.setData('text/plain', html);
    document.removeEventListener('copy', copyCall);
  });
  document.execCommand('copy');
};