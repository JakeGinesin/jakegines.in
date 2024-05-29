Every single tool in this list can be placed into two categories: *model checkers* and *theorem provers*. Model checkers do *automated* verification via exhaustive exploration of a state space, while *theorem provers* do verification by checking for *unification* (in other words, equality between two sides of an equation). Most tools stick to one side, but certain tools such as Tamarin, TLA, Fstar, and Isabelle can do both.   

In general, the largest *gap* I personally identify in research reasoning about protocols and distributed systems is the challenge of *inductively* proving properties of interest across an arbitrary number of system nodes. This is easily the hardest thing to prove about any distributed system in my opinion. In special special cases where abstraction can be done smartly, such as in the case of the [Tendermint Verification effort in Ivy](https://galois.com/blog/2021/07/formally-verifying-the-tendermint-blockchain-protocol/), you can do this easily. But there does not exist a general framework to do so. This is future research and absolutely someone's (but probably not my) future PhD thesis.  

# Theorem Provers
- Coq
    - Description: Dependent types, verification involves checking type unification between the proposition and the assumptions
    - Protocols: [Raft](https://github.com/uwplse/verdi?tab=readme-ov-file)
- Lean
- Agda
    - Description: Employs the curry-howard correspondence and minimizes tactic usage in constructing proofs. 
    - Protocols: [Hotstuff](https://arxiv.org/pdf/2203.14711.pdf)
- ACL2/ACL2s
    - Description: Uses higher-order logic. 
- Idris
- Isabelle/HOL
    - Description: Uses higher-order logic and equivalence unification
- fstar
    - Protocols: employed by microsoft. Used for QUIC.
- [Cryptol](https://galois.com/project/cryptol/)
    - Description: Hardware correctness for cryptographic algorithms. Similarly, see [Software Analysis Workbench](https://saw.galois.com/)
    - Protocols: [TLS](https://d1.awsstatic.com/Security/pdfs/Continuous_Formal_Verification_Of_Amazon_s2n.pdf), [AWS](https://galois.com/blog/2023/09/the-impact-of-provable-security-aws-and-supranational/)

# Model Checkers

I loosely categorize model checkers into two categories: *general* model checkers and *dolev-yao* model checkers. Both have seen ample usage in protocol analysis. In general, model checkers are great at finding *violations* to claims; oftentimes, tools feature heuristics for more quickly navigating the search space to such violations. However, verification in this context generally requires exhaustive state space search, which can be extremely expensive (albeit, fully automatic). In order to ensure the state space is finite (such that verification is decidable with an automated algorithm), the *expressability* of models that model checkers can reason about is limited. 

## General Model Checkers

### Temporal Logics
- Spin/Promela
    - Description: Reasons about systems as they change over time via linear temporal logic. Under the hood, checks intersection emptiness between Buchi Automata--- one derived from the system, and one derived from the LTL property. In general, this problem is PSPACE-complete.
    - Protocols verified: SCTP, TCP, DCCP, Lightning (BTC), [Paxos](https://arxiv.org/abs/1408.5962)
- NuSMV
    - Description: Does LTL and CTL verification based on binary decision diagrams. Extended by NuXMV, which uses SOTA SAT algorithms, and employs SMT to handle certain infinite-state cases. See [NuSMV](https://nusmv.fbk.eu/) and [NuXMV](https://nuxmv.fbk.eu/).
    - NuSMV: Protocols verified: an [IoT interaction scheme](https://ieeexplore.ieee.org/document/7889238)
    - NuXMV: Used to verify d-mils. [d-mils.org/](http://www.d-mils.org/)
- Uppaal
    - Description: uses timed automata to do verification. See: [uppaal.org/](https://uppaal.org/)
- TLC
    - Description: automated verification of models specified in TLA+, which uses the underlying temporal logic of actions to do verification. TLC can only do exhaustive verification on a decidable subset of TLA+. To combat state-space explosion, you can declare symmetries, parellelize the state space exploration step, or do interleaving with the TLA proof assistant.
    - Protocols: Raft
- [MCMT](http://users.mat.unimi.it/users/ghilardi/mcmt/)
    - Description: uses SMT for model checking such that you can more easily reason about infinte-state systems.
- [Alloy](https://alloytools.org/)
    - Description: A modeling language that uses a SAT solver as the underlying verification method. Supports bounded model checking and the modeling of infinite-state systems.
    - Protocols: Chord
- [LTSMIN](https://github.com/utwente-fmt/ltsmin)
    - Description: A general model checking toolset for reasoning about LTL/CTL. Connects many different front-ends (Spin, UPPALL, etc), to different back-ends (bdd-based reachability, distributed reachability, etc).
- [Spot](https://spot.lre.epita.fr/)
    - Description: a platform for manipulating LTL expressions and Buchi Automata. Used in conjunction with LTSMIN, and inferfaces with various modeling languages. 
- [P](https://github.com/p-org/P)
    - Description: A distributed systems model checker that is similar to spin, in that its central model involves state machines that communicate via channels. Back-ends include state-based model checking and symbolic execution.
    - Protocols: Employed by AWS, Microsoft, [Galois](https://galois.com/blog/2024/02/galois-twisp-avoiding-foolishness-in-distributed-systems/)
- Dafny
    - Protocols: [Paxos](https://www.andrew.cmu.edu/user/bparno/papers/ironfleet.pdf), a key-value store

### Dolev-Yao
In short, Dolev-Yao is a threat model for reasoning about cryptographic handshakes in the context of an attacker that controls the communication channels. Reasoning about protocols in this space is decidable, and is akin to model checking in cases where arbitrarily sized datatypes aren't used.

- Tamarin
    - Description: Dolev-Yao-based crypto theorem prover that features a tactic system, user-defined heuristics, and high expressiveness. This tool can also be put in the theorem proving section.
    - Protocols: Many from class
- Verifpal
    - Description: A simple model checking language that comes with primitives pre-packed. Supports extractions to Coq and ProVerif (which does computational analysis instead of symbolic)
    - Protocols: employed by Trail of Bits to analyze various protocols (I can vouch for this, but I'm NDAed so I can't really speak on deets)
- Cryptoverif
    - Description: Uses the computational game-based model as opposed to Dolev-Yao. Can be partially automated, or can be user-guided.
- Proverif
- AVISPA
- Scyther
- Easycrypt

### Refinement Types
Refinement types are an ergonomic way to reason about implementations, and they have seen use in verifying particularly cryptographic primitive properties.

- [FStar](https://www.fstar-lang.org/), [Lowstar](https://fstarlang.github.io/lowstar/html/LowStar.html)
- [Liquid Haskell](https://en.wikipedia.org/wiki/Liquid_Haskell)

### SAT/SMT
Extremely general solvers should be employed when the system you're trying to model is finite, and yet what you're trying to express cannot be done in the framework of any existing tool. Modeling performance of distributed systems, for example, has made lots of use of SMT solvers. Also see: the SAT, SMT, and Model Checking competitions, which optimize for performance across various benchmarks.
- Z3, CVC5

# Other Links
- Galois on [Crypto Provers](https://galois.com/blog/2021/05/who-is-verifying-their-cryptographic-protocols/)
- [QED Manifesto](https://www.cse.chalmers.se/research/group/logic/TypesSS05/Extra/wiedijk_2.pdf)
- [Formalizing 100 Theorems](https://www.cs.ru.nl/~freek/100/0)
- [Strong Consistency Model](https://aphyr.com/posts/313-strong-consistency-models)
- [Towards Self-Verification of HOL Light](https://www.cl.cam.ac.uk/~jrh13/papers/holhol.pdf)
