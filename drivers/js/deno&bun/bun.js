import path from "path";
import os from "node:os";
import { dlopen, FFIType, suffix, ptr } from "bun:ffi";

export const machine = os.machine();
export const platform = os.platform();
const dllPath = path.join(
  __dirname,
  `../../../core/zig-out/lib/libkivi-${machine}-${platform}-none.${suffix}`
);
export const dlopenLib = dlopen(dllPath, {
  kivi_init: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.u32,
  },
  kivi_deinit: {
    args: [FFIType.ptr, FFIType.ptr],
  },
  kivi_get: {
    args: [
      FFIType.ptr,
      FFIType.cstring,
      FFIType.usize,
      FFIType.ptr,
      FFIType.usize,
    ],
    returns: FFIType.u32,
  },
  kivi_set: {
    args: [
      FFIType.ptr,
      FFIType.cstring,
      FFIType.usize,
      FFIType.cstring,
      FFIType.usize,
    ],
    returns: FFIType.u32,
  },
  kivi_del: {
    args: [
      FFIType.ptr,
      FFIType.cstring,
      FFIType.usize,
      FFIType.ptr,
      FFIType.usize,
    ],
    returns: FFIType.u32,
  },
});

export const bunUtils = {
  makeBufferPtr: function (value) {
    return ptr(value);
  },
  symbols: dlopenLib.symbols,
};
