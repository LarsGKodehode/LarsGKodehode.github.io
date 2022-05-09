// a collection of common functions

// the hmb logging class
class hmbLogger {
  log(message) {
    let msgType = typeof(message);
    switch (msgType) {
      case (msgType === "string"):
        return this.#log(message);
      case (msgType === "object"):
        return this.#disassemble(message);
    };
  };


  // private stuff

  // logs each entry seperatly
  #disassemble(message) {
    for (const key of Object.entries(message)) {
      this.#log(message[key]);
    };

    return true;
  };

  // edit this to change where stuff is logged
  #log(message) {
    console.log(message);
    return true;
  };
};

export {
  hmbLogger,
};
  