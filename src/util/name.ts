const PREFIX = 'ieditor';

export function createClassNameFunc(subName: string): (name: string) => string  {
  return function (name: string): string {
    return `${PREFIX}-${subName}-${name}`;
  }
}

export function createClassName(name: string): string  {
  return `${PREFIX}-${name}`;
}