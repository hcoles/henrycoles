FROM jekyll/jekyll:latest

WORKDIR /srv/jekyll

CMD ["jekyll", "serve", "--host", "0.0.0.0", "--livereload"]
