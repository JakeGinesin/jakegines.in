I got kinda bored of Vim's default start screen. So, I created a cool Vim start screen without using the VimStart plugin. See an image of it below:

[[vimstart]](/media/vimstart2.png)

### Setup
The setup is pretty simple - all I do is open and modify a custom buffer whenever I run `nvim` without any arguments. 

In `init.vim`, I execute the function `Start()` on `VimEnter`. To see more about how `VimEnter` works, see vim's helpscreen with `:h VimEnter`. 
```
fun! Start()
  " startup function contents
endfun

autocmd VimEnter * call Start()
```

I set the function to return if there are command line arguments, the buffer isn't empty, vim isn't invoked by `vim` or `gvim`, or if I start in insert mode:
```
if argc() || 
  line2byte('$') != -1 || 
  v:progname !~? '^[-gmnq]\=vim\=x\=\%[\.exe]$' ||
  &insertmode
    return
endif
```

Then, I set a bunch of local options for the new buffer:
```
" new buffer
enew

" buffer options
setlocal
    \ bufhidden=wipe
    \ buftype=nofile
    \ nobuflisted
    \ nocursorcolumn
    \ nocursorline
    \ nolist
    \ nonumber
    \ noswapfile
    \ norelativenumber
    \ syntax=off
```

Then, I fill the content of the buffer with my ascii art:
```
" write to buffer
for line in split(system('cat startscreen.vimstart'), '\n')
    call append('$', '' . l:line)
endfor

" No modifications to this buffer
setlocal nomodifiable nomodified
```

I set some specific commands for this buffer:
```
" new buffer commands
nnoremap <buffer><silent> e :enew<CR>
nnoremap <buffer><silent> i :enew <bar> startinsert<CR>
nnoremap <buffer><silent> o :enew <bar> startinsert<CR>
nmap <C-a> :enew <bar> startinsert <bar> :Goyo 80<CR>
```

To disable scrolling, I changed the scroll mappings on this buffer only:
```
nmap <buffer> <ScrollWheelUp> <nop>
nmap <buffer> <S-ScrollWheelUp> <nop>
nmap <buffer> <C-ScrollWheelUp> <nop>
nmap <buffer> <ScrollWheelDown> <nop>
nmap <buffer> <S-ScrollWheelDown> <nop>
nmap <buffer> <C-ScrollWheelDown> <nop>
nmap <buffer> <ScrollWheelLeft> <nop>
nmap <buffer> <S-ScrollWheelLeft> <nop>
nmap <buffer> <C-ScrollWheelLeft> <nop>
nmap <buffer> <ScrollWheelRight> <nop>
nmap <buffer> <S-ScrollWheelRight> <nop>
nmap <buffer> <C-ScrollWheelRight> <nop>
```

And that's it! If you're curious, you can find my full `init.vim` file on [Github](https://github.com/JakeGinesin/dotfiles/blob/master/.config/nvim/init.vim).
