---
title:
layout: default
permalink: /books/
published: true
---


<div class="ProjectContainer">

  {% for project in site.books %}

          <div class="projectTile">
          <img src="/assets/images/{{ project.profile.image }}" class="bookimg" />
          <span>
          <a href="{{ project.url }}" >
              {{ project.title }}
          </a>
          </span>

          </div>

  {% endfor %}


</div>
