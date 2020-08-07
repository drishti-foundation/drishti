import { useState as _useState } from 'react';

type Setter<T> = (newState: Partial<T>) => void;

const useState = <T>(initialValue: T): [T & { set: Setter<T> }, Setter<T>] => {
  const [state, _setState] = _useState(initialValue);

  const setState = (newState: Partial<T>) => _setState(state => ({ ...state, ...newState }));

  return [{ ...state, set: setState }, setState];
};

export default useState;
