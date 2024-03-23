This document tries to build up intuitionist (constructive) logic.

# Resources 
- Intro to linear logic: [logicallycoherent.github.io/blog/introduction-to-linear-logic/](https://logicallycoherent.github.io/blog/introduction-to-linear-logic/)
- Intuitionist Logic Wikipedia: [en.wikipedia.org/wiki/Intuitionistic_logic](https://en.wikipedia.org/wiki/Intuitionistic_logic)
- Sequent Calculus Wikipedia Page: [en.wikipedia.org/wiki/Sequent_calculus](https://en.wikipedia.org/wiki/Sequent_calculus)
- Interaction Nets Blog: [zicklag.github.io/blog/interaction-nets-combinators-calculus/](https://zicklag.github.io/blog/interaction-nets-combinators-calculus/)

# Topics
- Natural deduction 
- Intuitionist Logic
- Hoare Logic
- Linear Logic
- Proof net
- Proof theory
- Interaction Nets
- Sequent Calculus (we can define our logic *in terms* of sequent calculus)
- Syntax, Semantics
- combinators : combinatory-logic.md

# Proof Calculus vs Logic
Proof calculus (calculi?) are formal systems and syntax for constructing proofs. They formalize the systems of reasoning that we have. Some examples:
- Natural deduction: models how we think intuitively. emphasizes introduction and elimination rules.
- Sequent calculus: represents logical arguments through sequents. helps for studying consistency and completeness. 
- Hilbert Systems: characterized by a small set of axioms and inference rules.

# Classical Sequent Calculus
A sequent is of the form: $P_1,...,P_n ⊢ Q_1,...,Q_n$ which just implies $P_1 \land ... \land P_n -> Q_1 \vee ... \vee Q_n$. "⊢" is a turnsile. Tao and Delta (Γ,Δ) are used to describe arbitrary formula.

An inference rule is a rule that, given one sequent (i.e. knowing that something holds from something else), we then know another sequent holds. An example:
cut(⊢P  P⊢Q)/(⊢Q) 

Which can be read as, "I know P and P implies Q, so using the inference rule 'cut' we know Q"

We can define all of basic logic this way!

It's inherently constructive

# Basic Definitions
- Intuitionist logic is *constructive* logic, and more closely mirrors the notion of constructive proof. 

