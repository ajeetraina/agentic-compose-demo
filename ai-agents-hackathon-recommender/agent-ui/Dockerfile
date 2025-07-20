FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy source code
COPY . .

# Set development environment
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3003

# Create user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Change ownership of everything to nextjs user
RUN chown -R nextjs:nodejs /app

# Create .next directory with correct permissions
RUN mkdir -p .next && chown -R nextjs:nodejs .next

USER nextjs
EXPOSE 3003

CMD ["npm", "run", "dev"]
