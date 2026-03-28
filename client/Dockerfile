FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose Next.js port
EXPOSE 3000

# Run in dev mode
CMD ["npm", "run", "dev"]
