FROM node:14-alpine as build

WORKDIR /app

# package.json and package-lock.json
COPY package*.json ./
RUN npm install --save-dev @babel/plugin-proposal-private-property-in-object
RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

# Copy the built app from the previous stage
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

# Default command to run the web server
CMD ["nginx", "-g", "daemon off;"]
