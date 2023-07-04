Raneto is an open-source nodejs knowledge base powered by markdown. It's very lightweight, and I currently have it hosted at [wiki.jakegines.in](https://wiki.jakegines.in).

UPDATE 12/18/2022: wiki is down. heroku changed their free shit. looking for a different hosting method. 

### Heroku
Heroku is the best free method of hosting Raneto that I have found so far. Raneto provides a short guide on heroku hosting [here](http://docs.raneto.com/tutorials/deploying-raneto-to-heroku). Unfortunately, Heroku uses an [Ephermeral Disk](https://devcenter.heroku.com/articles/active-storage-on-heroku), meaning any changes written to the disk will not persist after the application is restarted. I am currently looking for a way around this.

### Notes
As of 5/15/2022, users looking to use Raneto should implement [this PR](https://github.com/gilbitron/Raneto/pull/364) manually. I emailed the primary maintainer about this a while back, but so far he hasn't responded.

### Further Reading
• [http://raneto.com/](http://localhost:4000/braindump/raneto)
• [https://github.com/gilbitron/Raneto](http://localhost:4000/braindump/raneto)