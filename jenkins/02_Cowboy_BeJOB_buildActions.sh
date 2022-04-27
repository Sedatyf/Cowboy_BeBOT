if pgrep -x "node" > /dev/null
then
    sudo kill $(ps ax | grep 'node' | grep -v grep | awk '{print $1}')
fi
cp /usr/share/.env /var/lib/jenkins/workspace/02_Cowboy_BeJOB/.env
npm install
cp -a /usr/share/CBB_data/. /var/lib/jenkins/workspace/02_Cowboy_BeJOB/data
BUILD_ID=dontKillMe node . &