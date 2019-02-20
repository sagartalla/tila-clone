service nginx start
echo $Environment
npm config set storefront:ENV $Environment
npm run start:ecs
