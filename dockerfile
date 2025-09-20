# Stage 1: Build
FROM node:22-slim AS builder

# Set working directory
WORKDIR /app

# Copy only package files first for better caching
COPY package.json package-lock.json* pnpm-lock.yaml* bun.lockb* yarn.lock* ./

RUN apt-get update && apt-get install -y python3 make g++ && ln -sf python3 /usr/bin/python

# Install dependencies (only dev needed for build)
RUN npm install --legacy-peer-deps

# Copy rest of project code
COPY . .

# Build the production React app
RUN npm run build


# Stage 2: Runtime
FROM node:22-slim AS runner

# Set working directory
WORKDIR /app

# Only copy minimal files for serving
COPY --from=builder /app/dist ./dist
COPY package.json ./

# installs python builder
RUN apt-get update && apt-get install -y python3 make g++ && ln -sf python3 /usr/bin/python

# Install only *production* dependencies (if any runtime needed)
RUN npm install --omit=dev --legacy-peer-deps

# Expose Vite preview default port
EXPOSE 4173

# Run the built app using vite preview
CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "4173"]

