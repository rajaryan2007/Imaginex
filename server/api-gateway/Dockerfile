FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose port (adjust if your service uses a different port)
EXPOSE 5000

# Start server
CMD ["npm", "run", "dev"]
