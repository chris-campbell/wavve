const mongoDBStoreConfig = {
  uri: process.env.MDB_CONNECTION_URL,
  collection: "sessions",
};

function sessionMiddlewareConfig(store) {
  const sessionMiddleware = {
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 180 * 60 * 1000, httpOnly: false },
    store: store,
    unset: "destroy",
  };

  return sessionMiddleware;
}

module.exports = {
  mongoDBStoreConfig,
  sessionMiddlewareConfig,
};
