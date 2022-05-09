# SOLID

1. Single Responsibility Principle
2. Open/Closed Principle
3. Liskov Substitution Principle
4. Interface Principle
5. Dependency Inversion Principle

---

1. Cada classe tem uma responsabilidade única;
2. As classes da aplicação devem ser abertas para extensão, mas fechadas para modificação;
3. Nós devemos poder substituir uma classe pai por uma herança dela e tudo continuar funcionando;
    - Ave (voar, bicar) -> Gavião. Gavião deve fazer exatamente o que sua classe pai faz e mais algumas coisas.

4. Separar pequenas funcionalidades para cada interface, e não ter tudo em uma única.
    - Impressora -> Imprimir, Scann, Digitalizar
    - class Impressora Implements Imprimir, Scann, Digitalizar {}

5. Facilitar testes