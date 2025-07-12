
-- Script SQL para criação do banco de dados MySQL
-- Avaliação de Segurança de Navegação - TECMED

CREATE DATABASE IF NOT EXISTS tecmed_security_assessment;
USE tecmed_security_assessment;

-- Tabela para armazenar os resultados das avaliações
CREATE TABLE assessment_results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    -- Dados do contato
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    company VARCHAR(255) NOT NULL,
    employee_count ENUM('1-5', '6-10', '10+') NOT NULL,
    
    -- Respostas das perguntas (JSON para flexibilidade)
    question_1_answer INT NOT NULL DEFAULT 0,
    question_2_answer INT NOT NULL DEFAULT 0,
    question_3_answer INT NOT NULL DEFAULT 0,
    question_4_answer INT NOT NULL DEFAULT 0,
    question_5_answer INT NOT NULL DEFAULT 0,
    
    -- Pontuação e resultado
    total_score INT NOT NULL DEFAULT 0,
    max_score INT NOT NULL DEFAULT 10,
    percentage INT NOT NULL DEFAULT 0,
    risk_level ENUM('Crítico', 'Regular', 'Bom', 'Excelente') NOT NULL,
    
    -- Metadados
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    user_agent TEXT
);

-- Índices para otimização
CREATE INDEX idx_email ON assessment_results(email);
CREATE INDEX idx_company ON assessment_results(company);
CREATE INDEX idx_created_at ON assessment_results(created_at);
CREATE INDEX idx_risk_level ON assessment_results(risk_level);

-- Tabela para armazenar configurações do sistema
CREATE TABLE system_config (
    id INT AUTO_INCREMENT PRIMARY KEY,
    config_key VARCHAR(100) UNIQUE NOT NULL,
    config_value TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Inserir configurações iniciais
INSERT INTO system_config (config_key, config_value, description) VALUES
('max_score', '10', 'Pontuação máxima possível na avaliação'),
('contact_phone', '(11) 9999-9999', 'Telefone de contato para especialistas'),
('contact_email', 'contato@tecmed.com.br', 'E-mail de contato'),
('company_name', 'TECMED - Soluções em Tecnologia', 'Nome da empresa');

-- View para relatórios simplificados
CREATE VIEW assessment_summary AS
SELECT 
    id,
    name,
    email,
    company,
    employee_count,
    total_score,
    percentage,
    risk_level,
    created_at,
    CASE 
        WHEN percentage >= 80 THEN 'Excelente'
        WHEN percentage >= 60 THEN 'Bom'
        WHEN percentage >= 40 THEN 'Regular'
        ELSE 'Crítico'
    END as calculated_risk_level
FROM assessment_results
ORDER BY created_at DESC;

-- Procedure para inserir nova avaliação
DELIMITER //
CREATE PROCEDURE InsertAssessment(
    IN p_name VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_phone VARCHAR(50),
    IN p_company VARCHAR(255),
    IN p_employee_count VARCHAR(10),
    IN p_q1 INT,
    IN p_q2 INT,
    IN p_q3 INT,
    IN p_q4 INT,
    IN p_q5 INT,
    IN p_ip VARCHAR(45),
    IN p_user_agent TEXT
)
BEGIN
    DECLARE total INT DEFAULT 0;
    DECLARE percentage INT DEFAULT 0;
    DECLARE risk VARCHAR(20) DEFAULT 'Crítico';
    
    SET total = p_q1 + p_q2 + p_q3 + p_q4 + p_q5;
    SET percentage = ROUND((total / 10.0) * 100);
    
    SET risk = CASE 
        WHEN percentage >= 80 THEN 'Excelente'
        WHEN percentage >= 60 THEN 'Bom'
        WHEN percentage >= 40 THEN 'Regular'
        ELSE 'Crítico'
    END;
    
    INSERT INTO assessment_results (
        name, email, phone, company, employee_count,
        question_1_answer, question_2_answer, question_3_answer, 
        question_4_answer, question_5_answer,
        total_score, max_score, percentage, risk_level,
        ip_address, user_agent
    ) VALUES (
        p_name, p_email, p_phone, p_company, p_employee_count,
        p_q1, p_q2, p_q3, p_q4, p_q5,
        total, 10, percentage, risk,
        p_ip, p_user_agent
    );
    
    SELECT LAST_INSERT_ID() as assessment_id;
END //
DELIMITER ;

-- Exemplo de consulta para relatórios
-- SELECT * FROM assessment_summary WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY);
