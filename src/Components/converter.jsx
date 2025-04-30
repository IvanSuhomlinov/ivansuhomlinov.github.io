const converter = (time) => {
    if (!time) return;
    const [h, m] = time.split(":");
    const min = Number(h) * 60;
    return Number(min) + Number(m);
  };

export default converter