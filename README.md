# testNodeJS

$ git clone https://github.com/ostno/testnodejs

$ cd testnodejs

$ yarn run start

Usage : yarn start btc,xrp,eth,eos,bch,usdt,ltc,trx,xlm,ada --refresh 10 --currency USD --order change1h --filter "price<400" --alternative

Options, use columnIDs : rank, abbr, name, price, change1h, change24h, change7d, marketCap, volume24h

--currency EUR  #USD by default

-h # Display help

--refresh 10 #Refresh every 10s

--filter "price<30"

--order price #Order ascending (using columnIds)

--alternative #use alternative.me instead of coingecko.net