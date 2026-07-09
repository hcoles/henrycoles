---
title:
layout: default
permalink: /books/
published: true
---


<div class="ProjectContainer">

  <div class="gallery">
  {% for project in site.books %}

    {% assign excerpt = project.content | split: '</h1>' | last | strip_html | normalize_whitespace | truncatewords: 28 %}
    <div class="projectTile">
      <a href="{{ project.url }}">
        <img src="/assets/images/{{ project.profile.image }}" class="bookimg" alt="" />
        <h2>{{ project.title }}</h2>
        <p>{{ excerpt }}</p>
        <span class="read-more">Read more &rarr;</span>
      </a>
    </div>

  {% endfor %}
  </div>

</div>
