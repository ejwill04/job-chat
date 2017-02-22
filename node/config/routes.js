module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('GET request to the homepage');
  });
}
