module.exports = {
  dev: {
    server: {
      port: 3000
    },
    mongo: {
      host: 'localhost',
      port: 27017,
      database: 'neumanns_dev'
    }
  },
  prod: {
    server: {
      port: 8000
    },
    mongo: {
      host: 'localhost',
      port: 27017,
      database: 'neumanns_prod'
    }
  }
};
