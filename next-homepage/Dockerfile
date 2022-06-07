FROM node:lts
MAINTAINER kimdongjang

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

WORKDIR /next-server


# default to port 80 for node, and 9229 and 9230 (tests) for debug
ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT 3000

COPY ./next-homepage/package.json /next-server/package.json
# COPY ./package-lock.json /next-server/package-lock.json
RUN npm install --no-cache


# copy in our source code last, as it changes the most
#COPY . /code
COPY . /next-server

# Run npm start script when container starts
CMD [ "npm", "run", "start" ]