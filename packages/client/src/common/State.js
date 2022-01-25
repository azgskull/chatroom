const StateFactory = (defaultValue) => {
  let value = defaultValue;
  const subscribers = new Set();

  const subscribe = (callBack) => {
    subscribers.add(callBack);
  };

  const unSubscribe = (callBack) => {
    subscribers.delete(callBack);
  };

  const get = () => {
    return value;
  };

  const set = (p) => {
    if (typeof p === "function") {
      value = p(value);
    } else {
      value = p;
    }

    subscribers.forEach((subscriber) => {
      // notify subscriber state changed
      subscriber();
    });
  };

  return {
    subscribe,
    unSubscribe,
    get,
    set,
  };
};

export default StateFactory;
