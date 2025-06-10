CREATE TABLE IF NOT EXISTS tabela_empregados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    idade INT,
    cargo VARCHAR(255)
);