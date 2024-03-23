
Algebraic automata theory is very cool.

# Books
- [The Mathematical Foundations of Automata Theory](https://www.irif.fr/~jep/PDF/MPRI/MPRI.pdf)

# Papers
- Decomposition of Automata (MIT): [people.csail.mit.edu/meyer/remarks-on-algebraic-decomposition.pdf](https://people.csail.mit.edu/meyer/remarks-on-algebraic-decomposition.pdf)
- Krohn Rhodes Logics: [arxiv.org/pdf/2304.09639.pdf](https://arxiv.org/pdf/2304.09639.pdf)

# Structures
In algebra, we kind of realize there are lots of different types of structures, and all of them enforce different types of rules. Here's a nice list of algebraic objects as a prelude to algebraic automata theory.

- Category: simply, a collection of objects that are linked together by arrows. You can compose the arrows associatively, and each object has an identity arrow. A basic example is the category of sets, where objects are sets, and arrows are functions. 

Group-like (one binary operation):
- Magma: A set with a closed binary operation
- Semigroup: A set with a closed and associative binary operation
- Monoid: A set with an identity, and the binary operation is closed, associative, and invertible
- Group: A set with an identity, and the binary operation is closed, associative, and invertible 
- Abelian Group: A set with an identity, and the binary operation is closed, associative, invertible, and commutative 

Ring-like:
- Ring: A set with two binary operations (written addition and multiplication) such that commutativity, associativity, inverse, and identity exist for addition, and there's distribution over addition
- Semiring: A ring, but with no additive inverse property
- Field: A ring that additionally has multiplicative identity, multiplicative inverse, and multiplicative commutativity 

For Algebraic Automata Theory, Semigroups and Identities are key!
