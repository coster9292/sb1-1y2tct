# sb1-1y2tct

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/coster9292/sb1-1y2tct)


## NETLIFY.app DEPLOYMENT
```bash
npm install -g netlify-cli
netlify login

netlify init   // will create a new deployment

netlify sites:list   // list sites
netlify link --name polite-horse-feea28   // link to the existing site

npm run build
netlify deploy --prod
```