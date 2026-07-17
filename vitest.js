import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Força o Vitest a processar todos os arquivos locais como ES Modules,
    // eliminando o conflito com caminhos do Windows (C:)
    alias: {
      '/': new URL('./', import.meta.url).pathname
    }
  }
});