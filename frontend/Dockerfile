# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy React app code
COPY . .

# Build React app
RUN npm run build

# Expose frontend port
EXPOSE 3000

# Start React server
CMD ["npm", "start"]
