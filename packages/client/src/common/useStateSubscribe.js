import { useCallback, useEffect, useState } from "react";

const useStateSubscription = (state, selector) => {
  const [current, setCurrent] = useState(
    selector ? selector(state.get()) : state.get()
  );

  const verifyChanges = useCallback(() => {
    if (selector) {
      setCurrent(selector(state.get()));
    } else {
      setCurrent(state.get());
    }
  }, [selector, state]);

  useEffect(() => {
    // subscribe
    state.subscribe(verifyChanges);

    return () => {
      state.unSubscribe(verifyChanges);
    };
  }, [state, verifyChanges]);

  return current;
};

export default useStateSubscription;
