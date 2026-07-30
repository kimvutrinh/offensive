
> [!cite]- REFERENCES
>  1. **man** - general information 
>  2. **--help** - usage w options 
>  3. **apropos** - description
>  4. [explainshell](https://explainshell.com/)


> [!important]- KEY POINTS
> - Everything is a **file**
> - **Don't** try to be **perfectionism**: the result can appear even when we don't follow exact the instructions! 
> - Write **w** permission on a file allows one to change contents of the file. Similarly, **w** on a directory (file) allows one to change the inner contents: changing the inner files' names, delete files... So, sticky bit **t** restricts this permission a bit so only owner/directory owner/root can modify but other users with **w** permission cannot!
> - Daemons are often identified by the letter **d** at the end of the program names
> - System V (SysV) init scripts control the system's startup and shutdown of services and daemons
> - Problem when bringing a process to foreground: (non-)interactive process. non-interactive process will take full control over terminal's in&out, unfortunately, it can even not recognize **CTRL+C**
> - Analyze **/etc/systemd/system/** for task scheduling. **/etc** were configuration files
> - Mounting involves linking a drive or partition to a directory, making its contents accessible within the overall file system hierarchy
> - **Network Access Control** + **/etc/network/interfaces**


> [!info]- UNCATEGORIZED
> 1. **CTRL+R** - search through the command history
> 2. **^** caret - stands for **CTRL**
> 3. **/etc/shadow** stores password hashes
> 4. **updatedb** then **locate** ~ **find**
> 5. **-newerXY** in **find**
> 6. Redirection: **<** STDIN and **1>** STDOUT and **2>** STDERR. **<<** for streaming
> 7. Closing **less** makes the output disappear rather than **more** 
> 8. RegEX: **.*** for AND in the specified order and **|** for OR
> 9. **execute** permission on the directory for further traversing
> 10. **setuid** and **setgid** - temporary access passes - **s** instead of **x**
> 11. **CTRL+Z** **{jobs,bg,fg}** send **SIGTSTP** Terminal Stop and put process in background
> 12. Notice **&** at the end of command after executing **CTRL+Z** and **bg**. OR: **sudo -b**
> 13. **locate** \*.service
> 14. **/etc/fstab** or **mount**
> 15. **lsof** command to list the open files on the file system.
> 16. Difficult to **replicate** on our local machines? Linux container **LXC**
> 17. **/var/log**
> 18. Cursor movement: **CTRL** + {**A** - beginning, **E** - end}; **ALT** + {**B** - backword, **F** - forword}
> 19. Erase: **CTRL** + {**U** - to beginning, **K** - to end}
