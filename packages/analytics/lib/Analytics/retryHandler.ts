export interface Args {
  tries?: number;
  reject: Function;
  options?: {
    minimumBackoff?: number;
    maximumBackoff?: number;
  };
}

const getTimeout = (options, tries) => {
  const maxBackoff = options.maximumBackoff || 64 * 1000;
  const timeout =
    (options.minimumBackoff || 1) +
    Math.floor(Math.random() * 1000) +
    ++tries * tries;
  if (timeout > maxBackoff) {
    return maxBackoff + Math.floor(Math.random() * 1000);
  }
  return timeout;
};

export const retryHandler = (
  { tries, reject, options }: Args,
  callback?: Function
) => {
  let cancelRequest = false;
  if (!tries) tries = 1;
  const toId = setTimeout(async () => {
    cancelRequest = true;
    const error = new Error("Timeout");
    error.name = "RequestTimeoutError";
    reject(error);

    const exponentialBackoff = () =>
      new Promise((r) => setTimeout(r, getTimeout(options, tries)));
    await exponentialBackoff();
    // do the retry
    callback && callback();
    clearTimeout(toId);
  }, 2000);

  return () => cancelRequest;
};
