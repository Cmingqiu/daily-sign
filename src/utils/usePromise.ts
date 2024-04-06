let _resolve: (v?: unknown) => void, _promise: Promise<any> | null;
export default function (cb: () => unknown) {
  if (_promise) _promise = null;
  _promise = new Promise(resolve => {
    _resolve = resolve;
  }).then(cb);

  return { _resolve };
}
