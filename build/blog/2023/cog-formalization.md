Cognition Formalization.

Through some conversations with some friends, as well as some of my own ongoing projects, I've been thinking about the relationship between cognition, formal grammars, and abstraction. I've also been checking out the work of [Noam Chomsky](https://en.wikipedia.org/wiki/Linguistics_of_Noam_Chomsky), the guy who pioneered formal language theory. 

In this post, I (very casually) hypothesize that the inherent difficulty of language-centric tasks is directly associated with language complexity. I understand there is a lot of scientific literature in this space, some of which probably invalidates parts of this post. I don't really care though, this post is a casual formalization and just for fun :)

# Three Primary "levels"
I think all thoughts can be broken up into three loose categories (largely inspired by the Chomsky Hierarchy):
- level 1: context-free thought
- level 2: context-sensitive thought
- level 3: free-form thought

Context-free thoughts are thoughts within the expressability of *context-free grammars*. Context-free grammars include Backus-Naur form, so programming languages generally fall in this category. Context-free grammars are less expressive than natural language, as they follow stricter language construction rules. So, reasoning about these languages often involves a higher level of symbolic reasoning.

Context-sensitive thoughts fall within the expressability of context-sensitive grammars, which encompasses natural language. Thinking in this way requires less symbolic reasoning, but formalizing abstract thoughts and ideas into a context-sensitive language (i.e. English) isn't necessarily trivial either.

Free-form thought falls outside of the expressability of context-sensitive grammars. Admittedly I don't have very good intuition for languages that fall outside of context-sensitive grammars (outside of Turing-theoretic stuff, [Rice's Theorem](https://en.wikipedia.org/wiki/Rice%27s_theorem) etc). It's generally easier to say what these languages *are not*. I'd imagine this category encompasses abstract concepts and ideas, pseudo-linguistic visualizations, etc. 

# Problem Framing
Intuitively, our brains are constantly translating concepts, thoughts, and ideas between all three levels. 

For example, when we read a book we translate level 2 thoughts (natural language) the associated abstract concepts and ideas. When I explain to someone my code, I am translating level 1 thoughts (context-sensitive grammar'ed code) to level 2 thoughts (natural language). Writing code from English specification is going from level 2 to level 1, while writing code with no specification is going from level 3 to level 1. 

Formalizing mathematical arguments in [Lean](https://leanprover-community.github.io/), some cool software that can verify the correctness of any mathematical theorem, is also going from level 3 to level 2. You'd imagine mathematics papers would be written in something closer to formal prose but [some argue that's not really the case](https://arxiv.org/pdf/2207.04779.pdf).

To me at least, it seems going up the hierarchy is easier than going down. This kinda makes sense, as by the Chomsky hierarchy we know:
$$
\text{ regular } \subseteq \text{context-sensitive } \subseteq \\
\text{ context-free } \subseteq \text{ recursively enumerable }
$$
In other words, there are simply *more* context-free languages than context-sensitive languages. Mapping from something less expressive to something more expressive intuitively is a different problem than going from more to less. More concretely, reading a book is much easier than writing a book. Writing textual specification from an implementation is generally easier than writing code from specification. 

# Mappings
We can also reason about *mappings* between levels. To give some more examples, a programming language (e.g. Python) and its textual specification is an example of mapping a level 2 thought to a level 1 thought (i.e. mapping natural language to a context-free grammar.) Such a mapping is generally easy to learn with a few good youtube tutorials. 

A learning a full-on language, however, can be considered learning a mapping from level 3 thought to level 2 thought (i.e. mapping abstract thoughts and ideas to a natural language, context-sensitive grammar.) This mapping, evidently, takes much longer to learn than a level 2 <-> level 1 mapping.

I think this mapping concept is quite neat. I've generally observed multi-lingual people (including myself) seem to seamlessly transition from communication in one language to another. There is no context switch. This mapping notion gives an interesting perspective to this phenomena. 

# Other thoughts
- are thoughts recursively enumerable? Intuitively, it may seem so. There's a finite universe after all, so does that imply the number of different thoughts we can have is also finite? 
- this leveling system is only reasoning about language. But, evidently, we think about more than just language. The process of drawing an image in your mind is nontrivial, and could be described as a different formalization process. 
- one could say our ability, as humans, to understand language stems from our ability to reason about *abstractions* of different flavors. 
