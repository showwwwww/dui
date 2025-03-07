const shallowCompare = <T>(a: T, b: T): boolean => {
  if (a === b) {
    return true;
  }

  if (typeof a !== typeof b) {
    return false;
  }

  if (a === null || b === null) {
    return false;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }

    for (let i = 0; i < a.length; i++) {
      if (!shallowCompare(a[i], b[i])) {
        return false;
      }
    }

    return true;
  }

  if (typeof a === 'object' && typeof b === 'object') {
    const keysA = Object.keys(a) as (keyof T)[];
    const keysB = Object.keys(b) as (keyof T)[];

    if (keysA.length !== keysB.length) {
      return false;
    }

    for (const key of keysA) {
      if (a[key] !== b[key]) {
        return false;
      }
    }

    return true;
  }

  return a === b;
};

export default shallowCompare;
