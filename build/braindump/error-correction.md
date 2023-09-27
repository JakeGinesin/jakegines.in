Say, you're storing information in a changing environment such as an SSD (whose blocks fail overtime) or sending data via radio waves where interruptions may occur. In this case, it'd be useful to have some sort of error-correcting algorithm to ensure any data that was changed or lost can be recovered.

Other applications of error-correcting means such as Reed-Solomon error correcting involves the rapid reading of hard drive sectors. Erroneous reads can be erroneously corrected post-collection from the disk (thus, increasing overall read performance, or at least putting some of the work on the CPU).

### Reed-Solomon
The idea behind Reed-Solomon is that we encode each value of our intended dataset with a value of a polynomial with degree less than k. In order to obtain a codeword of the encoded code, the message symbols are treated as coefficients of a polynomial.

### References
- [thessdguy.com/tag/reed-solomon/](https://thessdguy.com/tag/reed-solomon/)
- [thessdguy.com/how-controllers-maximize-ssd-life-improved-ecc/#more-633](https://thessdguy.com/how-controllers-maximize-ssd-life-improved-ecc/#more-633)
- [en.wikipedia.org/wiki/Reed%E2%80%93Solomon_error_correction](https://en.wikipedia.org/wiki/Reed%E2%80%93Solomon_error_correction)



