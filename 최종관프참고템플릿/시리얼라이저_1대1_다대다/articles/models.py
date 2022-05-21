from django.db import models

# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Comment(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Card(models.Model): #게시글에 여러개 카드 가능 카드에 여러개 게시글 가능(카드ex. 카테고리)
    # Many to Many 시리얼라이저는 어느 쪽에 생성해도 상관 없음 -> 참조나, 역참조해야할 주체가 변경만 될 뿐임
    articles = models.ManyToManyField(Article, related_name='cards') #카드 입장에서 articles니까 아티클입장에서는 cards
    name = models.CharField(max_length=100) 

    