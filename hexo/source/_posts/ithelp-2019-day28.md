---
layout: blog
title: "[Day 28] Google AI Hub - 1"
date: 2019-10-06 07:30:21
tags: ["Google AI", "AI Hub", "鐵人賽"]
author: Joseph
categories: ["Joseph", "AI & Machine Learning"]
---
> 話說照{% post_link ithelp-2019-day1 第一天 %}的規劃，今天本來要寫[Recommendation AI](https://cloud.google.com/recommendations)，不過我測了很久始終無法使用Recommendation AI、無法Enable它，所以只好就此作罷。

### AI Hub
今天找其他的玩具來玩，翻到了**AI Hub**，Hub會讓人直接連想到集線器，**AI Hub**就是把很多AI、ML集中在一起的平台，你可以在上面使用大家的AI model，也可以分享自己的AI上去給大家用。

我今天會來介紹其中幾個內容：**service**、**notebook**、**tensorflow module**，入門一下AI Hub。
<!-- more -->

#### [Service](https://aihub.cloud.google.com/u/0/s?category=service)
這部分相對單純，它把Google提供的AI服務都整合在這裡，你可以看到很多是我們前幾天文章有提到的內容，像是**Text-to-speech**、**Video Intelligence**等等。
![service](service.jpg)

隨便點進去**Text-to-speech**，可以看到除了一些介紹，就是給個連結引導去**Visit**或**Get started**。
![service-try](service-try.jpg)

至於沒有提供的，它會給你個Link讓你有地方可以**Apply**。
![service-apply](service-apply.jpg)

#### [Notebook](https://aihub.cloud.google.com/u/1/s?category=notebook)
在去年寫[Machine Learning Crash course](https://ithelp.ithome.com.tw/users/20103835/ironman/1806)的文章的時候，有很多線上Example都是用**Colab**的形式在練習，這邊也把MLCC裡所有的Colab都聚集在這裡，成為Notebook，讓大家可以搜尋後可以透過旁邊的**Colab**連結測試。
![notebook](notebook.jpg)

#### [Tensorflow module](https://aihub.cloud.google.com/u/1/s?category=tensorflow-module)
這邊聚集了很多Tensorflow module，可以透過Tensorflow hub的方式引入到自己的Code裡去。像是下面的範例就有提供Link `https://tfhub.dev/google/efficientnet/b1/classification/1`，也有提供code example，幾乎不用在從頭設計model了。
```golang
module = hub.Module("https://tfhub.dev/google/efficientnet/b1/classification/1")
height, width = hub.get_expected_image_size(module)
images = ...  # A batch of images with shape [batch_size, height, width, 3].
logits = module(images)  # Logits with shape [batch_size, num_classes].
```
![tensorflow module](tensorflow-module.jpg)

寫到這邊差不多把AI Hub講了大半段，裡面的內容自己動手操作會更了解，明天還有**Kubeflow pipeline**可以實際動手玩看看，希望一切順利。

OK，今天的文章就到這邊，謝謝各位的觀看。
