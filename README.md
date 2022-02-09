# loja-virtual
A challenge made by the company to create an E-Commerce using .Net and ReactJS, and utilizing mensageria at least for the payment api.
I decided to make a CQRS where every part is your own API that talk with eachother through message bus using RabbitMQ, and adding a BFF(Backend for Frontend) to minimize
the compleximity.

Um desafio feito pela empresa com o objetivo de criar um e-commerce usando .Net e ReactJS, e fazendo uma api separada do pagamento que irá ser consumida por mensageria,
além de implementar o pagar.me.
Eu decidi fazer utilizando CQRS para já trabalhar com a mensageria entre todas as API's, cada uma cuidadndo das suas responsabilidades, o sistema de mensageria foi feito utilizando
RabbitMQ, e foi adicionado um BFF(Backend para o Frontend) para diminuir a complexidade de chamada das multiplas API's para o frontend, já preparando para caso aja um mobile.
