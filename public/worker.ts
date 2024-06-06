let interval: NodeJS.Timeout | null = null;

onmessage = (event) => {
  if (event.data === "start") {
    interval = setInterval(() => {
      postMessage(10);
    }, 10);
  } else if (event.data === "pause") {
    if (interval) clearInterval(interval);
  }
};
