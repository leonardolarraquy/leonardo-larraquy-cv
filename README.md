# leonardo-larraquy-cv

Monorepo with two **independent** static sites:

| Folder | Domain | Description |
|--------|--------|-------------|
| [`leonardolarraquy/`](leonardolarraquy/) | [leonardolarraquy.com.ar](https://www.leonardolarraquy.com.ar/) | Personal CV portfolio (HTML/CSS/JS) |
| [`cloudexperts/`](cloudexperts/) | [cloudexperts.com.ar](https://cloudexperts.com.ar/) | Cloud Experts business site (React + Vite) |

Each site has its own assets, deploy target, and domain. They do not load resources from each other.

## Deploy

**Personal CV:** upload `leonardolarraquy/` to its hosting.

**Cloud Experts:**

```bash
cd cloudexperts/web
npm install
npm run build
# Deploy cloudexperts/web/dist/ to S3 + CloudFront
```

See [cloudexperts/README.md](cloudexperts/README.md) for full details.
