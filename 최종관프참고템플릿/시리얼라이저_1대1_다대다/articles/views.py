from urllib import response
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_list_or_404, get_object_or_404
#from .serializers import ArticleListSerializer, ArticleSerializer, CommentSerializer
from .models import Article, Comment, Card
from articles import serializers
from .serializers.article import ArticleListSerializer,ArticleSerializer
from .serializers.comment import CommentSerializer
from .serializers.card import CardSerializer

# Create your views here.
# @api_view()
@api_view(['GET', 'POST'])
def article_list(request):
    if request.method == 'GET':
        # articles = Article.objects.all()
        articles = get_list_or_404(Article) #쿼리셋을 조회했는데 데이터가 없으면 404를 제공해야 함
        serializer = ArticleListSerializer(articles, many=True) #multiple object에 many=True 필수임
        return Response(serializer.data) #전체 게시글에 대한 응답을 json 형태로 해주는 view 함수임

    elif request.method == 'POST':
        # print(request.data)
        serializer = ArticleSerializer(data=request.data) #첫번째인자는 instance이기 때문에 data를 호명해주고 request.data를 넣어줌
        if serializer.is_valid(raise_exception=True): #raise_esception을 해주면 유효성인증을 못했을 때 자동으로 400 bad request반환되므로 코드 줄일 수 있음
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED) #status의 속성값으로 오류코드에 대한 상수값을 반환하는 것임
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'DELETE', 'PUT'])
def article_detail(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)

    if request.method == 'GET':
        serializer = ArticleSerializer(article) #단일 객체니까 many=True 불필요
        return Response(serializer.data)

    elif request.method == 'DELETE':
        article.delete()
        data = {
            'delete': f'데이터 {article_pk}번이 삭제되었습니다.',
        }
        return Response(data, status=status.HTTP_204_NO_CONTENT) 

    elif request.method == 'PUT':
        serializer = ArticleSerializer(article, request.data) #기존의 정보가 필요하므로 첫번째에 instance로 article이 들어감
        # serializer = ArticleSerializer(article, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


@api_view(['GET'])
def comment_list(request):
    comments = get_list_or_404(Comment)
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)


@api_view(['GET', 'DELETE', 'PUT'])
def comment_detail(request, comment_pk):
    comment = get_object_or_404(Comment, pk=comment_pk)
    
    if request.method == 'GET':
        serializer = CommentSerializer(comment)
        return Response(serializer.data) 

    elif request.method == 'DELETE':
        comment.delete()
        data = {
            'delete': f'데이터 {comment_pk}번이 삭제되었습니다.',
        }
        return Response(data, status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        serializer = CommentSerializer(comment, request.data)
        # serializer = CommentSerializer(comment, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


@api_view(['POST'])
def comment_create(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(article=article) #foreign key 에 대한 정보를 인스턴스로 전닫 가능 -> 몇번 게시글에 작성해야 하는지 정보를 주는것
        # + 시리얼라이저에서 읽기 전용 필드로 article을 설정해주는것도 잊지말기!
        return Response(serializer.data, status=status.HTTP_201_CREATED)


# 카드(카테고리) 조회
@api_view(['GET']) 
def card_list(request):
    cards = get_list_or_404(Card)
    serializer = CardSerializer(cards, many=True)
    return Response(serializer.data)




@api_view(['GET', 'DELETE', 'PUT'])
def card_detail(request, card_pk):
    card = get_object_or_404(Card, pk=card_pk)

    if request.method == 'GET':
        serializer = CardSerializer(card)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        card.delete()
        data = {
            'delete': f'데이터 {card_pk}번이 삭제되었습니다.',
        }
        return Response(data, status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        serializer = CardSerializer(card, request.data)
        # serializer = ArticleSerializer(article, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

# 게시글에 카드(카테고리를) 등록해보기
@api_view(['POST']) 
def register(request, card_pk, article_pk):
    card = get_object_or_404(Card, pk=card_pk)
    article = get_object_or_404(Article, pk=article_pk)

    if card.articles.filter(pk=article.pk).exists(): #카드에 아티클이 이미 등록 되있다면
        card.articles.remove(article) #카드에서 게시글이 삭제
    else:
        card.articles.add(article) #아니라면 카드에 게시글이 등록
    
    serializer = CardSerializer(card) #articleserializer로 해도됨
    return Response(serializer.data)

    