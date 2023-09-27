Jake's most useful vim commands:
navigation: 
j -> move down
w -> jump forward a word
b -> jump backward a word
home, end -> front, back of line
G -> last line of doc
gg -> first line of doc
f[x], F[x] -> jump to next/prev instance of character "x"
e -> move that shit right

insert:
i -> insert before cursor
I -> insert at beginning of line
a -> insert after cursor
A -> insert at end of line
ea -> insert at end of word
o -> insert at next line
O -> insert at prev line

visual mode:
- v -> start visual mode
- V -> select entire line with visual mode
- v + aw -> visual mode on word
- d -> delete
- y -> yank, copy
- ~ -> switch cases of selected
- u -> lowercase 
- U -> uppercase
- $ -> go to end of the line

cut and paste:
- yw -> yank word
- P -> paste before cursor
- p -> paste after cursor
- daw -> delete word under cursor plus space after

indenting:
- >> -> indent shit right
- << -> indent shit left

search and replace:
- /pattern -> search for pattern
- ?pattern -> search backwards for pattern
- escape escape -> delete search shit

recording: 
- q + <letter> -> start recording. q -> stop recording
- @ + <letter> -> replay
