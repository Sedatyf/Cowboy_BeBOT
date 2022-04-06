sudo kill $(ps ax | grep 'node' | grep -v grep | awk '{print $1}')
cp /usr/share/.env /var/lib/jenkins/workspace/02_Cowboy_BeJOB/.env
npm install
cp /usr/share/dailyScore.json /var/lib/jenkins/workspace/02_Cowboy_BeJOB/data/dailyScore.json
BUILD_ID=dontKillMe node . &