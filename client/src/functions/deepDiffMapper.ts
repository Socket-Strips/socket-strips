type UnknownObject = {
  [k: string]: unknown;
};

// ? Taken from https://stackoverflow.com/questions/8572826/generic-deep-diff-between-two-objects but changed to only return changes.
// ! DO NOT USE IN PRODUCTION, UNTESTED AND LIKELY UNSTABLE
const deepDiffMapper = (function () {
  return {
    VALUE_CREATED: "created",
    VALUE_UPDATED: "updated",
    VALUE_DELETED: "deleted",
    VALUE_UNCHANGED: "unchanged",
    map: function (obj1: unknown, obj2: unknown): UnknownObject | null {
      if (this.isFunction(obj1) || this.isFunction(obj2)) {
        throw "Invalid argument. Function given, object expected.";
      }

      if (this.isValue(obj1) || this.isValue(obj2)) {
        const type = this.compareValues(obj1, obj2);

        if (type !== this.VALUE_UPDATED) {
          return null;
        }

        return obj1 === undefined
          ? (obj2 as UnknownObject)
          : (obj1 as UnknownObject);
      }

      const diff: UnknownObject = {};

      for (const key in obj1 as UnknownObject) {
        if (this.isFunction((obj1 as UnknownObject)[key])) {
          continue;
        }

        let value2 = undefined;
        if ((obj2 as UnknownObject)[key] !== undefined) {
          value2 = (obj2 as UnknownObject)[key];
        }

        const change = this.map((obj1 as UnknownObject)[key], value2);

        if (change === null) {
          continue;
        }

        diff[key] = change;
      }
      for (const key in obj2 as UnknownObject) {
        if (
          this.isFunction((obj2 as UnknownObject)[key]) ||
          diff[key] !== undefined
        ) {
          continue;
        }

        const change = this.map(undefined, (obj2 as UnknownObject)[key]);

        if (change === null) {
          continue;
        }

        diff[key] = change;
      }

      return diff;
    },
    compareValues: function (value1: unknown, value2: unknown) {
      if (value1 === value2) {
        return this.VALUE_UNCHANGED;
      }
      if (
        this.isDate(value1) &&
        this.isDate(value2) &&
        (value1 as Date).getTime() === (value2 as Date).getTime()
      ) {
        return this.VALUE_UNCHANGED;
      }
      if (value1 === undefined) {
        return this.VALUE_CREATED;
      }
      if (value2 === undefined) {
        return this.VALUE_DELETED;
      }
      return this.VALUE_UPDATED;
    },
    isFunction: function (x: unknown) {
      return Object.prototype.toString.call(x) === "[object Function]";
    },
    isArray: function (x: unknown) {
      return Object.prototype.toString.call(x) === "[object Array]";
    },
    isDate: function (x: unknown) {
      return Object.prototype.toString.call(x) === "[object Date]";
    },
    isObject: function (x: unknown) {
      return Object.prototype.toString.call(x) === "[object Object]";
    },
    isValue: function (x: unknown) {
      return !this.isObject(x) && !this.isArray(x);
    },
  };
})();

export default deepDiffMapper;
