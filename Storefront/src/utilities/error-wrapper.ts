export const configureDevelopmentEnvironment = () => {
  if (process.env.NODE_ENV === 'development') {
    const consoleError = console.error;
    console.error = function (...args) {
      const message = args[0]; // Assuming the error message is the first argument

      if (
        typeof message === 'string' &&
        (message.includes('React does not recognize the') ||
          message.includes('The tag'))
      ) {
        return;
      }
      consoleError.apply(console, args);
    };
  }
};
