
export function generateUuid(opts?: { easy?: boolean }) {
	const _uuid = () =>{
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  if (opts?.easy === true) {
    return `${_uuid()}${_uuid()}`;
  }
  return `${_uuid()}${_uuid()}-${_uuid()}-${_uuid()}-${_uuid()}-${_uuid()}${_uuid()}${_uuid()}`;
}