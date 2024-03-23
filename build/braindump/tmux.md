Tmux is a terminal multiplexor. It's very useful when working while tunneled through ssh or the likes.

### Basic Commands
Tmux controls are, by default, initialized through `ctrl + b`.

Commands (C-x indicates holding C, then pressing x):
- `tmux` -> create tmux session
- `C-b %` -> create new pane in tmux session (vertically)
- `C-b "` -> create new pane in tmux session (horizontally)
- `C-b [arrow keys]` -> navigate panes
- `C-b x` -> close current pane
- `C-b c` -> create new tmux window 
- `C-b [0-9]` -> navigate window panes

### Further Exploring 
- [A Quick and Easy Guide to tmux](https://www.hamvocke.com/blog/a-quick-and-easy-guide-to-tmux/)
- [tmux Github wiki](https://github.com/tmux/tmux/wiki)
- [tmux cheat sheet](https://tmuxcheatsheet.com/)
