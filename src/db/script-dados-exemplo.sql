INSERT INTO usuarios (nome, email, documento, senhaCriptografada) VALUES
('Patrícia', 'patricia@aurum.com', '974.048.270-86', 'senha123cripto');

INSERT INTO clientes (nome, documento, telefone, usuarioId) VALUES
('Rafael', '744.634.200-59', '(11) 91234-5678', 1),
('Rhillary', '064.953.680-03', '(11) 92345-6789', 1),
('Guilherme Campos', '756.804.680-00', '(21) 93456-7890', 1),
('Luiza', '777.003.560-09', '(21) 93456-7890', 1);

INSERT INTO enderecoClientes (logradouro, numero, complemento, bairro, estado, cidade, cep, clienteId) VALUES
('Rua das Flores', '123', 'Apto 45', 'Lourdes', 'Minas Gerais', 'Belo Horizonte', '01001-000', 1),
('Av. Brasil', '456', '', 'Icaivera', 'Minas Gerais', 'Betim', '01401-000', 2),
('Rua das Acácias', '789', 'Casa', 'Eldorado', 'Minas Gerais', 'Contagem', '32315-020', 3),
('Rua Angustura', '789', 'Casa', 'Serra', 'Minas Gerais', 'Belo Horizonte', '22010-000', 4),
('Rua Do Ouro', '222', 'Apto 7A', 'Serra', 'Minas Gerais', 'Belo Horizonte', '22010-333', 4);

INSERT INTO joias (nome, descricao, preco, quantidade, usuarioId) VALUES
('Anel de Ouro', 'Anel em ouro 18k com pedra zircônia', 350.00, 10, 1),
('Colar de Prata', 'Colar delicado de prata com pingente coração', 180.00, 5, 1),
('Pulseira de Pérola', 'Pulseira com pérolas', 250.00, 3, 1);

INSERT INTO pedidos (valorTotal, usuarioId, clienteId) VALUES
(530.00, 1, 1),  -- Rafael comprou o anel e o colar
(250.00, 1, 4); -- Luiza comprou a pulseira

INSERT INTO joiasPedidos (quantidade, precoUnidade, subtotal, pedidoId, joiaId) VALUES
(1, 350.00, 350.00, 1, 1),  -- Anel de Ouro no pedido 1
(1, 180.00, 180.00, 1, 2),  -- Colar de Prata no pedido 1
(1, 250.00, 250.00, 2, 3);  -- Pulseira de Pérola no pedido 2

INSERT INTO pagamentos (qtdParcelas, numeroParcela, valorParcela, status, formaPagamento, datavencimento, datapagamento, usuarioId, pedidoId, clienteId) VALUES
(2, 1, 265.00, 'Pago', 'Cartão', '2025-05-05 14:30:00', '2025-04-29 13:00:00', 1, 1, 1),
(2, 2, 265.00, 'Pendente', 'Cartão', '2025-06-05 14:30:00', null, 1, 1, 1),
(1, 1, 250.00, 'Pago', 'Dinheiro', '2025-05-05 14:30:00', '2025-05-04 09:30:00', 1, 2, 4);