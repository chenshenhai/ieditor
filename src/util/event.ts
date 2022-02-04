

type TypeEventArgMap  = {
  'setEditValue': string,
  'getEditValue': void,
  'insertEditValue': string, 
  'openFile': void,
  'openFolder': void,
  'importImage': void,
  'newFile': void,
  'setPreviewValue': string,
  'getPreviewValue': void,
}

type TypeEventTriggerResult = {
  'setEditValue': void,
  'getEditValue': string,
  'openFile': void,
  'openFolder': void,
  'importImage': void,
  'newFile': void,
  'insertEditValue': string, 
  'setPreviewValue': string,
  'getPreviewValue': void,
}
  
interface TypeEvent {
  on<T extends keyof TypeEventArgMap >(key: T, callback: (p: TypeEventArgMap[T]) => void): void;
  off<T extends keyof TypeEventArgMap >(key: T, callback: (p: TypeEventArgMap[T]) => void): void;
  trigger<T extends keyof TypeEventArgMap >(key: T, p: TypeEventArgMap[T]): Array<TypeEventTriggerResult[T]> | null;
}

class Event implements TypeEvent {

  private _listeners: Map<string, ((p: any) => void)[]>;

  constructor() {
    this._listeners = new Map();
  }

  on<T extends keyof TypeEventArgMap >(eventKey: T, callback: (p: TypeEventArgMap[T]) => void) {
    if (this._listeners.has(eventKey)) {
      const callbacks = this._listeners.get(eventKey);
      callbacks?.push(callback);
      this._listeners.set(eventKey, callbacks || []);
    } else {
      this._listeners.set(eventKey, [callback]);
    }
  }
  
  off<T extends keyof TypeEventArgMap >(eventKey: T, callback: (p: TypeEventArgMap[T]) => void) {
    if (this._listeners.has(eventKey)) {
      const callbacks = this._listeners.get(eventKey);
      if (Array.isArray(callbacks)) {
        for (let i = 0; i < callbacks?.length; i++) {
          if (callbacks[i] === callback) {
            callbacks.splice(i, 1);
            break;
          }
        }
      }
      this._listeners.set(eventKey, callbacks || []);
    }
  }

  trigger<T extends keyof TypeEventArgMap >(
    eventKey: T, arg: TypeEventArgMap[T]
  ): TypeEventTriggerResult[T][]|null {
    const callbacks = this._listeners.get(eventKey);
    if (Array.isArray(callbacks)) {
      const results: TypeEventTriggerResult[T][] = []
      callbacks.forEach((cb) => {
        const result = cb(arg) as TypeEventTriggerResult[T];
        results.push(result);
      });
      return results;
    } else {
      return null;
    }
  }

  has<T extends keyof TypeEventArgMap> (name: string) {
    if (this._listeners.has(name)) {
      const list: ((p: TypeEventArgMap[T]) => void)[] | undefined = this._listeners.get(name);
      if (Array.isArray(list) && list.length > 0) {
        return true;
      }
    }
    return false;
  }
}

export const eventHub = new Event();
