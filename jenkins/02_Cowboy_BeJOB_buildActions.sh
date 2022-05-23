if pgrep -x "node" > /dev/null
then
    pm2 stop index.js
fi
cp /usr/share/.env /var/lib/jenkins/workspace/02_Cowboy_BeJOB/.env
npm install
cp -a /usr/share/CBB_data/. /var/lib/jenkins/workspace/02_Cowboy_BeJOB/data
BUILD_ID=dontKillMe pm2 start index.js --time