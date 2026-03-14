FROM node:20-alpine

# Set direktori kerja di dalam container
WORKDIR /app

# Install dependency sistem yang mungkin dibutuhkan oleh library Node (contoh: node-gyp)
RUN apk add --no-cache libc6-compat

# Copy hanya file manifest untuk memanfaatkan fitur Docker Cache
COPY package.json package-lock.json* ./

# Install dependency
RUN npm install

# (Opsional) Copy sisanya. Pada mode development, file-file ini sebenarnya akan
# ditimpa oleh Volume Mounting dari docker-compose agar Hot Reload bekerja.
COPY . .

# Set environment ke development
ENV NODE_ENV=development

# Expose port Next.js
EXPOSE 3000

# Jalankan server development
CMD ["npm", "run", "dev"]
