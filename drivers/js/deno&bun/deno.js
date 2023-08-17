let suffix = "";
switch (Deno.build.os) {
  case "windows":
    suffix = "dll";
    break;
  case "darwin":
    suffix = "dylib";
    break;
  default:
    suffix = "so";
    break;
}

const dllPath = new URL(
  await import.meta.resolve(`../../../core/zig-out/lib/libkivi.${suffix}`)
);
export const dlopenLib = Deno.dlopen(dllPath, {
  kivi_init: { parameters: ["pointer", "pointer"], result: "u32" },
  kivi_deinit: { parameters: ["pointer"], result: "void" },
  kivi_get: {
    parameters: ["pointer", "pointer", "usize", "pointer", "usize"],
    result: "u32",
  },
  kivi_set: {
    parameters: ["pointer", "pointer", "usize", "pointer", "usize"],
    result: "u32",
  },
  kivi_del: {
    parameters: ["pointer", "pointer", "usize", "pointer", "usize"],
    result: "u32",
  },
});

export const denoUtils = {
  makeBufferPtr: function (value) {
    return Deno.UnsafePointer.of(value);
  },
  symbols: dlopenLib.symbols,
};
