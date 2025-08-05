# Imagem base
FROM node:18

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos
COPY package*.json ./
COPY tsconfig*.json ./
COPY src ./src

# Instala dependências
RUN npm install

# Compila TypeScript (se necessário)
RUN npm run build || echo "sem build script, ignorando..."

# Expõe a porta da API
EXPOSE 3000

# Comando para iniciar a API
CMD ["npm", "run", "dev"]
