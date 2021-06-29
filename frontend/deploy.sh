eval "$(ssh-agent -s)" &&
ssh-add -k ~/.ssh/id_rsa &&

source ~/.profile
echo "$DOCKER_PASSWORD" | docker login --username $DOCKER_USERNAME --password-stdin
sudo docker stop discordfe
sudo docker rm discordfe
sudo docker rmi your_username/your_image_name:latest
sudo docker run -d --name discordfe -p 8443:80 your_username/your_image_name:latest
