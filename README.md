# yuna

a build tool for the mobile game epic 7

## accuracy

i personally can't verify that these calculations are accurate, but they use information from the
datamined values [here](https://docs.google.com/spreadsheets/d/1aqL0Uj26PRW_jAUj8pYaSls_DOuFq30fvwQh8ol74-E/htmlview?sle=true#gid=0)

anecdotally this has proven true for me thus far, but please let me know if anything is out of order by filing an issue

## running

like any old node project:

```sh
npm install
npm start
```

you'll probably get some silliness about eslint breaking changes (how can eslint be a breaking change?) so make sure preflight checks are off

```sh
echo SKIP_PREFLIGHT_CHECK=true > .env
```

## contributing

throw a pull request my way and if i'm not too lazy i'll take a look
