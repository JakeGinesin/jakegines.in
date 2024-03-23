Theory of Computation. This document does not contain many formal constructions - reference a textbook or something for that.

# Textbooks & Resources
- [MIT 6.045J (automata, computability, and complexity)](https://ocw.mit.edu/courses/6-045j-automata-computability-and-complexity-spring-2011/) (went through this one fully)
- [MIT 18.404J (theory of comp)](https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/)
- Michael Sispser's TOC textbook

# Language 
The absolute foundation of theory of computation (imo) is the notion of *formal grammar*. A formal grammar generally defines the syntax of formal grammars in terms of specific production rules. 

Certain production rules can be more strict than others; depending on the strictness of your production rules, you can only possibly define certain "classes" of languages. Chomsky formalized the Chomsky hierarchy in the 1950s, defining regular, context-free, context-sensitive, and recursively enumerable languages. Classical notions of computation are defined in context to this hierarchy. 

The language hierarchy is defined as follows:
$$
\text{Regular } \subseteq \text{ Context-Free } \subseteq \text{ Context-Sensitive } \subseteq \text{ Recursively Enumerable }
$$
That is, every regular language is also a context-free language, etc.

# Regular Languages
The defining characteristic of regular languages is that they are recognizable by deterministic or nondeterministic finite automata, or a regular expression. Example language:
$$
L = \{a^n \: \mid \: n \ge 0 \}
$$

Regular language tidbits:
- regular languages are closed under intersection, union, concatenation, complement, and kleene star (i.e., doing these operations with regular languages always results in another regular language)
- containment ($L(A) \subseteq L(B)$), disjointness ($L(A) \cap L(B) = \emptyset$), and universality are decidable in PSPACE-complete time. 
- membership and emptiness are also decidable
- Buchi Automata are finite automata that accept *infinite* words, or $\Sigma^w$

# Context-Free Languages
Ever try to write a regular expression for something, but realize the regular expression just can't handle the complexity if what you're trying to make it do? For example, you try to write a regular expression to recognize a Python function and fail miserably. What do you do!?!

Context-Free languages are recognized by pushdown automata, essentially a finite automata with a stack of memory. Example language:
$$
L = \{a^n b^n \: \mid \: n \ge 1 \}
$$

Context-free languages have *context-free grammars*, which notably are expressive enough to recognize programming language syntax. BNF form and EBNF form, which are grammars used more in practice, are equivalent to context-free grammars.

Many tidbits:
- The pushdown automata recognizing a given context-free language acts as a *parser*, and checking membership (i.e. $w \in L(G)) is decidable in polynomial time. - CFLs are closed under union, concatenation, and kleene star
- CFLs, notably, are *not* closed under intersection, complement, and difference - equivalence ($L(A) = L(B)$), disjointness ($L(A) \cap L(B)$), containment ($L(A) \subseteq L(B)$), and universality between context-free languages are *undecidable* 

# Context-Sensitive Languages
Context-sensitive languages, also known as *Turing-decidable languages*, are languages where a Turing machine accepts words in the language and rejects words not in the language (aka, *deciding* any given word). This implies the deciding Turing machine halts on any given word inside or outside the language. Example:
L = \{a^n b^n c^n \: \mid \: n \ge 1 \}

Tidbits:
- Closed under union, intersection, concatenation, kleene star
- Not closed complement 
- Natural language is generally considered context-sensitive 

# Recursively Enumerable 
Recursively enumerable languages are languages in which a Turing machine can enumerate all words in the language. Keep in mind, regular, context-free, and context-sensitive languages are subsets of recursively enumerable, so a Turing machine can enumerate the words in those languages too. Recursively Enumerable languages can also be defined as languages that *are not* decidable by Turing machines.

Via rice's theorem, we know all non-trivial semantic properties of programs are *undecidable*. Thus, for example language in this class is:
$$
L = \{M \: \mid \: M \text{ accepts a string } w}
$$

# Beyond Recursively Enumerable
Languages where a Turing machine cannot recognize a language evidently fall outside of recursively enumerable. Here's an example:
$$
L = \{M \: \mid \: M \text{ rejects a string } w}
$$

# Decidable vs Recognizable vs Unrecognizable 
Understand that on a given input, a Turing machine can either accept, reject, or loop. Via the halting problem (and, rice's theorem), we cannot write a program to determine whether a given turing machine will halt (either on accept or reject) on some arbitrary input. 

So, we define our terms (given a language $L$):
- Deciding $TM$ on $L$: $TM$ accepts words in $L$ and rejects words not in $L$
- Recognizing $TM$ on $L$: $TM$ accepts words in $L$ and rejects or loops on words not in $L$
- Non-recognizing $TM$ on $L$: $TM$ accepts or loops on words in $L$, and rejects or loops on words not in $L$

# Deterministic and Nondeterministic Turing Machines
Without getting into the formal definition of a turing machine, turing machines consist of a *finite control* and an *infinite tape*. The finite control can be *deterministic* or *nondeterministic* (similarly to finite automata that recognize regular languages). 

Given a nondeterministic turing machine that decides some language, if there *exists* a path where a word is accepted, that word is included in the language. Also, a deterministic turing machine can simulate a nondeterministic turing machine in exponential time (i.e. exploring all the branches).

# A simple characterization of P and NP
Simply put, a *problem* is in the complexity class $P$ is it can be solved by a *deterministic* turing machine in polynomial time. Similarly, a problem is in $NP$ if it can be solved in polynomial time by a *nondeterministic* turing machine. 

# References
- Michael Sisper's textbook
- [en.wikipedia.org/wiki/Formal_grammar](https://en.wikipedia.org/wiki/Formal_grammar)
- [Rice's Theorem](https://courses.engr.illinois.edu/cs373/sp2013/Lectures/lec25.pdf)
