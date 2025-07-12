
# Informações de Conexão com Banco de Dados MySQL

## Configuração do Banco de Dados

Para conectar sua aplicação ao banco de dados MySQL, você precisará das seguintes informações:

### Variáveis de Ambiente Recomendadas

Crie um arquivo `.env` na raiz do seu projeto com as seguintes variáveis:

```env
# Configurações do Banco de Dados MySQL
DB_HOST=localhost
DB_PORT=3306
DB_NAME=tecmed_security_assessment
DB_USER=seu_usuario_mysql
DB_PASSWORD=sua_senha_mysql

# Chave de Conexão Completa (Connection String)
DATABASE_URL=mysql://seu_usuario:sua_senha@localhost:3306/tecmed_security_assessment

# Configurações Adicionais
DB_CONNECTION_LIMIT=10
DB_TIMEOUT=60000
```

### Exemplo de Configuração para Node.js/Express

```javascript
const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'tecmed_security_assessment',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// Exemplo de inserção de dados
async function saveAssessmentResult(data) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      `CALL InsertAssessment(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.name,
        data.email,
        data.phone,
        data.company,
        data.employeeCount,
        data.answers[1],
        data.answers[2],
        data.answers[3],
        data.answers[4],
        data.answers[5],
        data.ipAddress,
        data.userAgent
      ]
    );
    return result;
  } finally {
    connection.release();
  }
}
```

### Para Aplicações PHP

```php
<?php
$servername = $_ENV['DB_HOST'] ?? 'localhost';
$username = $_ENV['DB_USER'] ?? 'root';
$password = $_ENV['DB_PASSWORD'] ?? '';
$dbname = $_ENV['DB_NAME'] ?? 'tecmed_security_assessment';

try {
    $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Exemplo de inserção
    $stmt = $pdo->prepare("CALL InsertAssessment(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $data['name'],
        $data['email'],
        $data['phone'],
        $data['company'],
        $data['employeeCount'],
        $data['answers'][1],
        $data['answers'][2],
        $data['answers'][3],
        $data['answers'][4],
        $data['answers'][5],
        $_SERVER['REMOTE_ADDR'],
        $_SERVER['HTTP_USER_AGENT']
    ]);
    
} catch(PDOException $e) {
    echo "Erro de conexão: " . $e->getMessage();
}
?>
```

## Segurança e Boas Práticas

1. **Nunca commite credenciais**: Use variáveis de ambiente
2. **Use SSL/TLS**: Configure conexões seguras em produção
3. **Limite permissões**: Crie usuário específico com permissões mínimas necessárias
4. **Backup regular**: Configure backup automático do banco
5. **Monitoramento**: Configure logs e alertas

## Comandos Úteis

### Criar usuário específico para a aplicação:
```sql
CREATE USER 'tecmed_app'@'localhost' IDENTIFIED BY 'senha_forte_aqui';
GRANT SELECT, INSERT, UPDATE ON tecmed_security_assessment.* TO 'tecmed_app'@'localhost';
FLUSH PRIVILEGES;
```

### Verificar conexão:
```bash
mysql -h localhost -u tecmed_app -p tecmed_security_assessment
```

## Estrutura de Dados que será Salva

A aplicação salvará os seguintes dados para cada avaliação:

- **Dados do usuário**: Nome, e-mail, telefone, empresa, número de funcionários
- **Respostas**: Pontuação de cada uma das 5 perguntas
- **Resultado**: Pontuação total, percentual, nível de risco
- **Metadados**: Data/hora, IP, user agent

## Relatórios Disponíveis

Use a view `assessment_summary` para relatórios simplificados:

```sql
-- Relatório dos últimos 30 dias
SELECT * FROM assessment_summary 
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
ORDER BY created_at DESC;

-- Estatísticas por nível de risco
SELECT risk_level, COUNT(*) as total, 
       AVG(percentage) as avg_percentage
FROM assessment_results 
GROUP BY risk_level;
```
