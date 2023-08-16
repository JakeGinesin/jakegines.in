My method for self-organization works really well for me. It might work really well for you too, so I decided I should share my setup.

I was ultimately inspired by [Jamie Rubin's blog post](https://jamierubin.net/2022/01/25/practically-paperless-with-obsidian-episode-15-daily-notes-as-an-index-to-my-life/) on his [Obsidian.md](https://obsidian.md/) notes setup and [Jeff Huang's blog post](https://web.archive.org/web/20220626044356/https://jeffhuang.com/productivity_text_file/) on his single text-file setup. Additional fine-tuning was inspired by [org mode](https://orgmode.org/), [org roam](https://www.orgroam.com/), [the Zettelkasten Method](https://zettelkasten.de/), and [the P.A.R.A. Method](https://fortelabs.com/blog/para/).

*If you're not familiar, Obsidian.md is a solid markdown editor. They advertise themselves as "A second brain, for you, forever." It's inferior to vim as an editor imo tho. More on obsidian:* [{1}](#one)

### Setup Details
My system involves using a *single main text file* as the primary means of organizing myself. My main text file is always edited using [neovim](https://neovim.io/) and lives on my [work laptop](/about#Setup). Everything is managed by git routinely backed up [{2}](#two).

Here's an example of a day of notes:
```
### [Date] 
- todo: [thing(s) I need to do]
- read: [thing I read] 
- idea: [idea I have]
- thought: [thought I have]
```
Here's an example: 
```
### 23-02-04
- todo: 
  (1) systems hw by 2/5
  (2) build updated SCTP spin model by mon
  (3) number theory hw due wed
  (4) set up webctf on digitalocean for TA-ing  
  (5) compile safe-LLVM with ninja

- thought: Now that my Unihertz Jelly 2 is dead,
    look into getting a replacement dumb phone

- unihertz jelly 2 root guide:
    https://www.reddit.com/r/UnihertzJelly2/wiki/index/root/ 
- read: https://beautifulracket.com/appendix/why-i-no-longer-contribute-to-racket.html 
- read: https://felleisen.org/matthias/Thoughts/Apology.html
- thought: PL people are wack
- idea: write this post
- thought: matt might suggested this blog: https://blog.regehr.org/
```
### Thoughts
This is a great organization method for several reasons:
  1. I can easily search for all my todos, thoughts, ideas, etc. 
  2. I can easily jump between days, or find a specific day
  3. I'm not limited by any sort of organizational structure
  4. Very little effort to maintain
  5. Flexible af

My workflow isn't exactly feature-hungry, so this setup works nicely for me. Although, there are some notable drawbacks. Mainly, it's impossible to create diagrams or anything visual. Also, It's hard to keep everything synched up across different devices (this isn't too big of a deal for me tho, see [{3}](#three)). 

### Beyond One Text File
If I want to make a continuous note for a specific topic, I'll create a file in the `abstract` notes directory:
```
.
|-- main.md
|-- abstract
    |-- topic.md
    |-- othertopic.md
    |-- etc.md
```
This keeps my *general* notes separate from my *topic-specific* notes. If need be, I can hyperlink between different files too. Also, note I *do not* keep my university notes in the `abstract` folder. Managing uni-specific work is a completely separate ball-game from managing general notes [{4}](#four). 

### Implementation Details
Because I use Linux as my operating system and Neovim as my text editor, the implementation of my setup is non-trivial and worth discussing. Technical details incoming. 

I wanted to be able to pop open a new window with my main notes file with a single keystroke. So, I mapped `super + o` in my [sxhkd](https://github.com/baskerville/sxhkd) config to open my terminal emulator, neovim, and execute a few commands within neovim. 
```
super + {o}
  alacritty -e 
    nvim /path/to/daily -c 
      "execute 'normal G' 
      | set path+=/path/to/abstract
      | Goyo "
```
Executing `normal G` emulates the user pressing `G` - e.g., in vim, jumping to the bottom of the file. Setting the `path` variable to `/path/to/abstract` allows me to hyperlink to other notes files in the `abstract` folder. And, Goyo is a plugin for *distraction-free writing in vim* (see the project's [Github repo](https://github.com/junegunn/goyo.vim)!)

With my current [Vim configuration](https://github.com/JakeGinesin/dotfiles), my Daily notes file looks like this: 

[[Notes Min]](/media/notes-min.png)

To generate today's date with a simple keybind, I use [UltiSnips](https://github.com/SirVer/ultisnips). My `.config/nvim/markdown.snippets` file looks like this:
```
snippet date "markdown add date" b
### `date +%y-%m-%d`
- $0
endsnippet
```
which results in:

[[Date showcase]](/media/date3.gif)

To search for and open notes files in the `abstract` folder, I configured [rofi](https://github.com/davatorium/rofi) as my fuzzy-search util: 
```
super + {ctrl} + {o}  
  // search for file and pass chosen to "cdir"
  find /path/to/abstract -follow 
    | grep -E '.md$' 
    | rofi -dmenu 
    | read chosen
    // open chosen file
    && alacritty -e nvim /path/to/abstract/$chosen -c 
      "Goyo 
      | set path+=/path/to/abstract"
```
Which looks like this:

[[Doing stuff]](/media/select3.gif)

To search through my non-main-file notes manually, I mapped `super + {shift} + {o}` to open [nvimtree](https://github.com/nvim-tree/nvim-tree.lua) instead of Goyo:
```
super + {shift} + {o}
  alacritty -e 
    nvim /path/to/daily -c 
    "execute 'normal G' 
    | NvimTreeOpen /path/to/abstract
    | set path+=/path/to/abstract"
```

### Notes
[[[{1}]]](one) [Obsidian](https://obsidian.md/) is cool. It has great features. It's just Obsidian isn't perfect, and I'm very picky. Obsidian [is not open source](https://web.archive.org/web/20230205063710/https://forum.obsidian.md/t/is-it-true-that-obsidian-is-already-open-source/46413/7), [requires a license to use](https://obsidian.md/terms) as of 2023, and subjects users to [a lengthy terms of service](https://obsidian.md/terms). Also, if I'm going to live out of a text file, I want the text editor I use to be fully customizable, y'know? 

[[[{2}]]](two) I back up all my notes in a high-quality SSD. This SSD has a git repository configured to pull and sync with my notes (as well as other stuff, like my programming projects). I have a script to do this automatically when the SSD is plugged into my computer and mounted. 

[[[{3}]]](three) I usually carry a [dumbphone](/blog/2023/phn) with virtually no productivity capability, so my phone isn't important to my workflow. It's not necessary for me to sync my notes to my phone (or any other device besides my backup server, for that matter). Although, for some people, I'd imagine this sort of feature would be important.

[[[{4}]]](four) I'll write about my full university notes setup eventually. Here's my organizational structure for the first two years of my computer science and mathematics degree: 
```
university
  |-- bachelor-1
  |   |-- semester-1
  |   |   |-- cell-biology-and-genetics
  |   |   |-- college-writing
  |   |   |-- data-science-with-python
  |   |   |-- discrete-mathematics
  |   |   |-- geography-ireland
  |   |   |-- calculus-1
  |   |   `-- music-in-ireland
  |   |-- semester-2
  |   |   |-- cybersecurity-foundations
  |   |   |-- discrete-structures
  |   |   |-- fundies-1
  |   |   |-- intro-cs-research
  |   |   `-- multivariable-calculus
  |   `-- summer-1
  |       `-- fundies-2
  `-- bachelor-2
      |-- semester-1
      |   |-- algorithms
      |   |-- cybersecurity-research-seminar
      |   |-- logic-and-computation
      |   `-- object-oriented-design
      `-- semester-2
          |-- computer-systems
          |-- linear-algebra
          |-- number-theory
          |-- research-seminar
          `-- security-and-privacy

current-semester -> semester-2
```
Notably, I keep a symlink between `current-semester` in my home directory to, well, the directory of my current semester. My structure is loosly based off [this blog post](https://castel.dev/post/research-workflow/).

### Interesting Related Stuff
- [How I'm able to take notes in mathematics lectures using LaTeX and Vim](https://castel.dev/post/lecture-notes-1/)
- [Johnny Decimal Project Organizaton System](https://johnnydecimal.com/) 
- [In Defense of Obsidian's Graph View](https://www.eleanorkonik.com/its-not-just-a-pretty-gimmick-in-defense-of-obsidians-graph-view/)
