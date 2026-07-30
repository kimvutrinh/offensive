Where is the point that I can inject?

from_label, content, location_url
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

loginAsAdmin