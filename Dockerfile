FROM oven/bun:latest

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json /app

RUN bun install

CMD [ "bun", "start" ]