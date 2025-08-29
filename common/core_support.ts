interface Deft {
  prefix: string;
}
export let deft: Deft | null = null;
export let getOwnPropertyDescriptor = Object?.getOwnPropertyDescriptor ?? null;
const getPrototypeOf = Object?.getPrototypeOf ?? null;
export let defineProperty = Object?.defineProperty ?? null;
// export let getOwnPropertyDescriptor;
if (!defineProperty && !getOwnPropertyDescriptor) {
  const prefix = `__SemblePropertyFor__`;
  deft = { prefix };
  defineProperty = (o, k, d) => {
    if (typeof k === "string") o[`${prefix}_${k}`] = d;
    if ("value" in d) o[k] = d.value;
    return o;
  };
  getOwnPropertyDescriptor = (o, p) => desc(o, p);
}

export function desc<T extends object, K extends keyof T>(
  obj: T,
  key: K
): PropertyDescriptor {
  if (deft) {
    if (typeof key === "string" && `${deft.prefix}_${key}` in obj)
      return (obj as any)[`${deft.prefix}_${key}`];
    if (key in obj)
      return {
        [`${deft.prefix}_value`]: {
          get() {
            return obj[key];
          },
          set(v) {
            obj[key] = v;
          },
        },
      } as any as PropertyDescriptor;
    return null;
  } else {
    if (key in obj) {
      for (;;) {
        let a = getOwnPropertyDescriptor(obj, key);
        if (a) return a;
        obj = getPrototypeOf(obj);
        if (obj === null) return null;
      }
    } else {
      return null;
    }
  }
}
export function descGet<T extends object, K extends keyof T>(
  obj: T,
  key: K
): T[K] {
  if (!deft) return obj[key];
  for (;;) {
    let des = desc(obj, key);
    if ("get" in des) return des.get();
    [obj, key] = [des as any, "value" as any];
  }
}
export function descSet<T extends object, K extends keyof T>(
  obj: T,
  key: K,
  val: T[K]
): T[K] {
  if (!deft) return (obj[key] = val);
  for (;;) {
    let des = desc(obj, key);
    if ("set" in des) return des.set(val), val;
    [obj, key] = [des as any, "value" as any];
  }
}
export function setNonEnumerableBaseline<T extends object, K extends keyof T>(
  object: T,
  key: K,
  val: T[K],
  desc: PropertyDescriptor = {}
): T[K] {
  if (!deft) {
    return (object[key] = val);
  }
  defineProperty(object, key, {
    writable: true,
    ...desc,
    enumerable: false,
    value: val,
  });
  return val;
}
