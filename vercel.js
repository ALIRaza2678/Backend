{
    "version": 2,
    "builds": [
      {
        "src": "app.js",
        "use": "@vercel/node"
      }
    ],
    "routes": [
      {
        "src": "/api/(.*)",
        "dest": "/app.js"
      }
    ]
  }
  