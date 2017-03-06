const localStorageMock = (() => {
  let store = {
    'activeUserId': {
      email: 'test@test.com',
    },
  };

  return {
    getItem: function (key) {
      return store[key] || null;
    },
    setItem: function (key, value) {
      store[key] = value.toString();
    },
    clear: function () {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock });
